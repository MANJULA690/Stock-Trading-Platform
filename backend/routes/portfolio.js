const express = require('express');
const router = express.Router();
const Holding = require('../models/Portfolio');
const { protect } = require('../middleware/auth');

// GET /api/portfolio - get all holdings
router.get('/', protect, async (req, res) => {
  try {
    const holdings = await Holding.find({ user: req.user._id });

    // Simulate current price update (in production, this would fetch live prices)
    const updated = holdings.map(h => {
      const fluctuation = 1 + (Math.random() - 0.48) * 0.02;
      h.currentPrice = parseFloat((h.avgBuyPrice * fluctuation).toFixed(2));
      return h;
    });

    const totalInvested = updated.reduce((sum, h) => sum + h.quantity * h.avgBuyPrice, 0);
    const currentValue = updated.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);
    const totalPnl = currentValue - totalInvested;
    const totalPnlPercent = totalInvested > 0 ? ((totalPnl / totalInvested) * 100).toFixed(2) : 0;

    res.json({
      holdings: updated,
      summary: {
        totalInvested: parseFloat(totalInvested.toFixed(2)),
        currentValue: parseFloat(currentValue.toFixed(2)),
        totalPnl: parseFloat(totalPnl.toFixed(2)),
        totalPnlPercent: parseFloat(totalPnlPercent),
        holdingsCount: holdings.length,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
