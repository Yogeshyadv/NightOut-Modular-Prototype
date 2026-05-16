const express = require('express');
const {
  applyForVerification,
  getVerificationStatus,
  getAllApplications,
  reviewApplication
} = require('../controllers/verification');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.post('/apply', authorize('vendor'), applyForVerification);
router.get('/status', authorize('vendor'), getVerificationStatus);

// Admin routes
router.get('/admin/all', authorize('admin'), getAllApplications);
router.put('/admin/:id', authorize('admin'), reviewApplication);

module.exports = router;
