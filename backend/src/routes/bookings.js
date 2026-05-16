const express = require('express');
const {
  getBookings,
  createBooking,
  updateBooking,
  verifyBooking
} = require('../controllers/bookings');


const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getBookings)
  .post(protect, createBooking);

router
  .route('/:id')
  .put(protect, authorize('vendor', 'admin'), updateBooking);

router
  .route('/verify')
  .post(protect, authorize('vendor', 'admin'), verifyBooking);

module.exports = router;

