const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  venue: {
    type: mongoose.Schema.ObjectId,
    ref: 'Venue',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  bookingDate: {
    type: Date,
    required: [true, 'Please add a booking date']
  },
  tickets: {
    type: {
      type: String,
      enum: ['stag', 'couple', 'vip'],
      required: true
    },
    count: {
      type: Number,
      required: true,
      min: 1
    }
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  qrCode: {
    type: String
  },
  shortCode: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate 6-digit short code
BookingSchema.pre('save', async function(next) {
  if (!this.shortCode) {
    this.shortCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});


module.exports = mongoose.model('Booking', BookingSchema);
