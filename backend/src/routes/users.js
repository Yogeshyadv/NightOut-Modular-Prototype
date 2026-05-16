const express = require('express');
const { getUsers, getVendors, deleteUser } = require('../controllers/users');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/', getUsers);
router.get('/vendors', getVendors);
router.delete('/:id', deleteUser);

module.exports = router;
