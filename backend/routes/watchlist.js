const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');
const { protect } = require('../middleware/auth');

// GET /api/watchlist
router.get('/', protect, async (req, res) => {
  try {
    let wl = await Watchlist.findOne({ user: req.user._id });
    if (!wl) wl = await Watchlist.create({ user: req.user._id, stocks: [] });
    res.json({ watchlist: wl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/watchlist/add
router.post('/add', protect, async (req, res) => {
  try {
    const { symbol, companyName, exchange } = req.body;
    if (!symbol) return res.status(400).json({ error: 'Symbol is required.' });

    let wl = await Watchlist.findOne({ user: req.user._id });
    if (!wl) wl = new Watchlist({ user: req.user._id, stocks: [] });

    const exists = wl.stocks.find(s => s.symbol === symbol.toUpperCase());
    if (exists) return res.status(409).json({ error: 'Already in watchlist.' });

    wl.stocks.push({ symbol: symbol.toUpperCase(), companyName, exchange });
    await wl.save();
    res.json({ watchlist: wl, message: `${symbol} added to watchlist.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/watchlist/:symbol
router.delete('/:symbol', protect, async (req, res) => {
  try {
    const wl = await Watchlist.findOne({ user: req.user._id });
    if (!wl) return res.status(404).json({ error: 'Watchlist not found.' });

    wl.stocks = wl.stocks.filter(s => s.symbol !== req.params.symbol.toUpperCase());
    await wl.save();
    res.json({ watchlist: wl, message: `${req.params.symbol} removed from watchlist.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
