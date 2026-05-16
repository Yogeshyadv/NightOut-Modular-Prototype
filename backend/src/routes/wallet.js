const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getWallet,
  requestWithdrawal,
  getAllWithdrawals,
  processWithdrawal
} = require('../controllers/wallet');

router.use(protect);

router.get('/', authorize('vendor'), getWallet);
router.post('/withdraw', authorize('vendor'), requestWithdrawal);

router.get('/admin/withdrawals', authorize('admin'), getAllWithdrawals);
router.put('/admin/withdrawals/:id', authorize('admin'), processWithdrawal);

module.exports = router;
