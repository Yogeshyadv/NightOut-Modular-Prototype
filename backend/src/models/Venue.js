const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a venue name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  category: {
    type: [String],
    required: true,
    enum: [
      'Club',
      'Lounge',
      'Pub',
      'Bar',
      'Cafe',
      'Other'
    ]
  },
  pricing: {
    stag: { type: Number, default: 0 },
    couple: { type: Number, default: 0 },
    vip: { type: Number, default: 0 }
  },
  images: [String],
  status: {
    type: String,
    enum: ['pending', 'active', 'rejected'],
    default: 'pending'
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Venue', VenueSchema);
