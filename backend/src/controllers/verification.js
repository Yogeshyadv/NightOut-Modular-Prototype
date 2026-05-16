const Verification = require('../models/Verification');
const User = require('../models/User');
const { createNotification } = require('./notifications');


// @desc    Apply for verification
// @route   POST /api/verification/apply
// @access  Private (Vendor)
exports.applyForVerification = async (req, res, next) => {
  try {
    // Check if already applied
    let application = await Verification.findOne({ vendor: req.user.id, status: 'pending' });
    if (application) {
      return res.status(400).json({ success: false, message: 'You already have a pending application' });
    }

    req.body.vendor = req.user.id;
    application = await Verification.create(req.body);

    // Notify Admins
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      await createNotification({
        recipient: admin._id,
        sender: req.user.id,
        type: 'verification_applied',
        title: 'New Verification Request',
        message: `${req.user.name} has applied for vendor verification.`,
        link: '/admin/verifications'
      });
    }

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get my verification status
// @route   GET /api/verification/status
// @access  Private (Vendor)
exports.getVerificationStatus = async (req, res, next) => {
  try {
    const application = await Verification.findOne({ vendor: req.user.id }).sort({ appliedAt: -1 });
    res.status(200).json({ success: true, data: application });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all verification applications (Admin only)
// @route   GET /api/verification/admin/all
// @access  Private (Admin)
exports.getAllApplications = async (req, res, next) => {
  try {
    const applications = await Verification.find().populate('vendor', 'name email').sort({ appliedAt: -1 });
    res.status(200).json({ success: true, data: applications });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Review application (Admin only)
// @route   PUT /api/verification/admin/:id
// @access  Private (Admin)
exports.reviewApplication = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    let application = await Verification.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    application.status = status;
    application.adminNotes = adminNotes;
    application.reviewedAt = Date.now();
    await application.save();

    // If approved, update User isVerified status
    if (status === 'approved') {
      await User.findByIdAndUpdate(application.vendor, { isVerified: true });
    } else {
      await User.findByIdAndUpdate(application.vendor, { isVerified: false });
    }

    // Notify Vendor
    await createNotification({
      recipient: application.vendor,
      sender: req.user.id,
      type: status === 'approved' ? 'verification_approved' : 'verification_rejected',
      title: status === 'approved' ? 'Account Verified!' : 'Verification Update',
      message: status === 'approved' 
        ? 'Congratulations! Your business has been verified. You can now manage your venues.' 
        : `Your verification request was ${status}. Notes: ${adminNotes || 'No notes provided.'}`,
      link: '/vendor/verification'
    });

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
