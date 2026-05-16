const Venue = require('../models/Venue');

// @desc    Get all venues
// @route   GET /api/venues
// @access  Public
exports.getVenues = async (req, res, next) => {
  try {
    // Only fetch active venues and populate owner details to check verification
    const venues = await Venue.find({ status: 'active' }).populate('owner', 'isVerified');
    
    // Filter out venues where owner is not verified
    const publicVenues = venues.filter(v => v.owner && v.owner.isVerified);

    res.status(200).json({ success: true, count: publicVenues.length, data: publicVenues });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// @desc    Get venues for logged in vendor
// @route   GET /api/venues/my
// @access  Private (Vendor)
exports.getMyVenues = async (req, res, next) => {
  try {
    const venues = await Venue.find({ owner: req.user.id });
    res.status(200).json({ success: true, count: venues.length, data: venues });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// @desc    Get single venue
// @route   GET /api/venues/:id
// @access  Public
exports.getVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ success: false, message: 'Venue not found' });
    res.status(200).json({ success: true, data: venue });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Create new venue
// @route   POST /api/venues
// @access  Private (Vendor/Admin)
exports.createVenue = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.owner = req.user.id;

    const venue = await Venue.create(req.body);
    res.status(201).json({ success: true, data: venue });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update venue
// @route   PUT /api/venues/:id
// @access  Private (Vendor/Admin)
exports.updateVenue = async (req, res, next) => {
  try {
    let venue = await Venue.findById(req.params.id);

    if (!venue) return res.status(404).json({ success: false, message: 'Venue not found' });

    // Make sure user is venue owner
    if (venue.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'User not authorized to update this venue' });
    }

    venue = await Venue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: venue });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete venue
// @route   DELETE /api/venues/:id
// @access  Private (Vendor/Admin)
exports.deleteVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) return res.status(404).json({ success: false, message: 'Venue not found' });

    // Make sure user is venue owner
    if (venue.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'User not authorized to delete this venue' });
    }

    await venue.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
