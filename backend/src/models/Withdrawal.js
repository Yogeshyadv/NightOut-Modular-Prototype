const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  method: {
    type: String,
    enum: ['UPI', 'Bank Transfer'],
    default: 'UPI'
  },
  methodDetails: {
    type: String, // UPI ID or Bank Details
    required: true
  },
  processedAt: Date,
  adminNotes: String
}, { timestamps: true });

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
