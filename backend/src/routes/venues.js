const express = require('express');
const {
  getVenues,
  getMyVenues,
  getVenue,
  createVenue,
  updateVenue,
  deleteVenue
} = require('../controllers/venues');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getVenues)
  .post(protect, authorize('vendor', 'admin'), createVenue);

router.get('/my', protect, authorize('vendor', 'admin'), getMyVenues);


router
  .route('/:id')
  .get(getVenue)
  .put(protect, authorize('vendor', 'admin'), updateVenue)
  .delete(protect, authorize('vendor', 'admin'), deleteVenue);

module.exports = router;
