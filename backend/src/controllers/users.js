const User = require('../models/User');
const Venue = require('../models/Venue');
const Booking = require('../models/Booking');

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private (Admin)
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user' });
    
    const enrichedUsers = await Promise.all(users.map(async (u) => {
      const bookings = await Booking.find({ user: u._id });
      const spent = bookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + b.totalPrice, 0);
      
      return {
        ...u.toObject(),
        bookingCount: bookings.length,
        totalSpent: spent
      };
    }));

    res.status(200).json({ success: true, count: users.length, data: enrichedUsers });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all vendors (Admin only)
// @route   GET /api/users/vendors
// @access  Private (Admin)
exports.getVendors = async (req, res, next) => {
  try {
    const vendors = await User.find({ role: 'vendor' });
    
    // Enrich with venue count and financial data
    const enrichedVendors = await Promise.all(vendors.map(async (v) => {
      const venues = await Venue.find({ owner: v._id });
      const venueIds = venues.map(vn => vn._id);
      
      const bookings = await Booking.find({ venue: { $in: venueIds } });
      const revenue = bookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + b.totalPrice, 0);

      return {
        ...v.toObject(),
        venueCount: venues.length,
        bookingCount: bookings.length,
        totalRevenue: revenue
      };
    }));

    res.status(200).json({ success: true, count: vendors.length, data: enrichedVendors });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
