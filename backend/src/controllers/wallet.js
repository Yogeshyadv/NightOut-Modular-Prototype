const Wallet = require('../models/Wallet');
const Withdrawal = require('../models/Withdrawal');
const Booking = require('../models/Booking');

// @desc    Get vendor wallet
// @route   GET /api/wallet
// @access  Private (Vendor)
exports.getWallet = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ vendor: req.user.id });
    
    if (!wallet) {
      wallet = await Wallet.create({ vendor: req.user.id });
    }

    const history = await Withdrawal.find({ vendor: req.user.id }).sort('-createdAt');

    res.status(200).json({ success: true, data: { wallet, history } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Request withdrawal
// @route   POST /api/wallet/withdraw
// @access  Private (Vendor)
exports.requestWithdrawal = async (req, res) => {
  try {
    const { amount, method, methodDetails } = req.body;
    
    const wallet = await Wallet.findOne({ vendor: req.user.id });
    if (!wallet) return res.status(404).json({ success: false, message: 'Wallet not found' });

    if (wallet.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    // Create withdrawal request
    const withdrawal = await Withdrawal.create({
      vendor: req.user.id,
      amount,
      method,
      methodDetails
    });

    // Update wallet (move from balance to pending)
    wallet.balance -= amount;
    wallet.pendingWithdrawals += amount;
    await wallet.save();

    res.status(201).json({ success: true, data: withdrawal });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all withdrawals (Admin)
// @route   GET /api/wallet/admin/withdrawals
// @access  Private (Admin)
exports.getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find().populate('vendor', 'name email business').sort('-createdAt');
    res.status(200).json({ success: true, data: withdrawals });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Process withdrawal (Admin)
// @route   PUT /api/wallet/admin/withdrawals/:id
// @access  Private (Admin)
exports.processWithdrawal = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const withdrawal = await Withdrawal.findById(req.params.id);
    
    if (!withdrawal) return res.status(404).json({ success: false, message: 'Request not found' });
    if (withdrawal.status !== 'pending') return res.status(400).json({ success: false, message: 'Already processed' });

    const wallet = await Wallet.findOne({ vendor: withdrawal.vendor });

    if (status === 'approved' || status === 'completed') {
      withdrawal.status = 'completed';
      withdrawal.processedAt = Date.now();
      
      wallet.pendingWithdrawals -= withdrawal.amount;
      wallet.totalWithdrawn += withdrawal.amount;
    } else if (status === 'rejected') {
      withdrawal.status = 'rejected';
      
      // Return funds to balance
      wallet.balance += withdrawal.amount;
      wallet.pendingWithdrawals -= withdrawal.amount;
    }

    withdrawal.adminNotes = adminNotes;
    await withdrawal.save();
    await wallet.save();

    res.status(200).json({ success: true, data: withdrawal });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
