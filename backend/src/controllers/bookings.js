const mongoose = require('mongoose');
const Booking = require('../models/Booking');

const Venue = require('../models/Venue');
const Wallet = require('../models/Wallet');
const QRCode = require('qrcode');


// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res, next) => {
  try {
    let query;

    // If user is admin, they can see all bookings
    // If vendor, they see bookings for their venues
    // If user, they see their own bookings
    if (req.user.role === 'admin') {
      query = Booking.find().populate('venue user');
    } else if (req.user.role === 'vendor') {
      const venues = await Venue.find({ owner: req.user.id });
      const venueIds = venues.map(v => v._id);
      query = Booking.find({ venue: { $in: venueIds } }).populate('venue user');
    } else {
      query = Booking.find({ user: req.user.id }).populate('venue');
    }

    const bookings = await query;
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  try {
    req.body.user = req.user.id;

    const venue = await Venue.findById(req.body.venue);
    if (!venue) return res.status(404).json({ success: false, message: 'Venue not found' });

    // Calculate total price (simplified logic)
    const pricePerTicket = venue.pricing[req.body.tickets.type] || 0;
    req.body.totalPrice = pricePerTicket * req.body.tickets.count;

    const booking = await Booking.create(req.body);

    // Generate QR Code data (e.g., booking ID)
    const qrData = JSON.stringify({
      bookingId: booking._id,
      user: req.user.name,
      venue: venue.name,
      date: booking.bookingDate
    });

    const qrCodeImage = await QRCode.toDataURL(qrData);
    booking.qrCode = qrCodeImage;
    await booking.save();

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update booking status (Check-in)
// @route   PUT /api/bookings/:id
// @access  Private (Vendor/Admin)
exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    // Authorization check
    if (req.user.role !== 'admin') {
      const venue = await Venue.findById(booking.venue);
      if (venue.owner.toString() !== req.user.id) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
      }
    }

    const oldStatus = booking.status;
    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // Credit wallet if marked as completed
    if (req.body.status === 'completed' && oldStatus !== 'completed') {
       const venue = await Venue.findById(booking.venue);
       const vendorId = venue.owner;
       const netEarnings = booking.totalPrice * 0.85;

       let wallet = await Wallet.findOne({ vendor: vendorId });
       if (!wallet) wallet = await Wallet.create({ vendor: vendorId });

       wallet.balance += netEarnings;
       wallet.totalEarned += netEarnings;
       await wallet.save();
    }

    res.status(200).json({ success: true, data: booking });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
// @desc    Verify booking (QR Scan / Manual Code)
// @route   POST /api/bookings/verify
// @access  Private (Vendor/Admin)
exports.verifyBooking = async (req, res, next) => {
  try {
    const { code } = req.body;
    
    // Find booking by ID or shortCode
    const booking = await Booking.findOne({
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(code) ? code : null },
        { shortCode: code.toUpperCase() }
      ]
    }).populate('venue user');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Invalid code - Booking not found' });
    }

    // Check if already checked in
    if (booking.status === 'completed') {
      return res.status(400).json({ success: false, message: 'Already checked in', data: booking });
    }

    // Check if cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking was cancelled', data: booking });
    }

    // Authorization check: Must be owner of the venue or admin
    if (req.user.role !== 'admin') {
      const venue = await Venue.findById(booking.venue);
      if (venue.owner.toString() !== req.user.id) {
        return res.status(401).json({ success: false, message: 'Not authorized for this venue' });
      }
    }

    // Update status
    booking.status = 'completed';
    await booking.save();

    // Credit wallet
    const netEarnings = booking.totalPrice * 0.85;
    let wallet = await Wallet.findOne({ vendor: booking.venue.owner });
    if (!wallet) wallet = await Wallet.create({ vendor: booking.venue.owner });

    wallet.balance += netEarnings;
    wallet.totalEarned += netEarnings;
    await wallet.save();

    res.status(200).json({ success: true, data: booking });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
