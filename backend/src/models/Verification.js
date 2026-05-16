const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: [true, 'Please add legal business name']
  },
  businessId: {
    type: String,
    required: [true, 'Please add tax/license ID']
  },
  businessAddress: {
    type: String,
    required: [true, 'Please add physical business address']
  },
  logo: String, // Base64 or URL
  slogan: String,
  website: String,
  socialLinks: {
    instagram: String,
    facebook: String,
    twitter: String
  },
  operatingHours: String,
  selectedPlan: {
    type: String,
    enum: ['starter', 'pro', 'elite'],
    default: 'starter'
  },
  contactNumber: {
    type: String,
    required: [true, 'Please add contact number']
  },

  documents: [String], // URLs to uploaded docs
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminNotes: String,
  appliedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: Date
});

module.exports = mongoose.model('Verification', VerificationSchema);
