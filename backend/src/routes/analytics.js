const express = require('express');
const { getVendorStats, getAdminStats } = require('../controllers/analytics');


const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.get('/vendor', protect, authorize('vendor'), getVendorStats);
router.get('/admin', protect, authorize('admin'), getAdminStats);


module.exports = router;
