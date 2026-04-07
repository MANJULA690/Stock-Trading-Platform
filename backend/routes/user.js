const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// GET /api/user/profile
router.get('/profile', protect, async (req, res) => {
  res.json({ user: req.user });
});

// PUT /api/user/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, pan } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, pan },
      { new: true, runValidators: true }
    );
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/user/add-funds
router.put('/add-funds', protect, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ error: 'Invalid amount.' });
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { accountBalance: amount } },
      { new: true }
    );
    res.json({ user, message: `₹${amount} added successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
