const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Holding = require('../models/Portfolio');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// GET /api/orders - get user's orders
router.get('/', protect, async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    const filter = { user: req.user._id };
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Order.countDocuments(filter);
    res.json({ orders, total, page: parseInt(page) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders/place - place an order
router.post('/place', protect, async (req, res) => {
  try {
    const { symbol, companyName, orderType, productType, orderVariety, quantity, price, triggerPrice } = req.body;

    if (!symbol || !orderType || !quantity || !price)
      return res.status(400).json({ error: 'Symbol, orderType, quantity, and price are required.' });

    const user = await User.findById(req.user._id);
    const totalValue = quantity * price;
    const brokerage = Math.min(20, totalValue * 0.0003);

    // Check balance for BUY orders
    if (orderType === 'BUY') {
      if (user.accountBalance < totalValue + brokerage)
        return res.status(400).json({ error: 'Insufficient funds. Please add money to your account.' });

      // Deduct from balance
      user.accountBalance -= (totalValue + brokerage);
      user.totalInvested += totalValue;
      await user.save();

      // Update or create holding
      let holding = await Holding.findOne({ user: req.user._id, symbol });
      if (holding) {
        const newQty = holding.quantity + parseInt(quantity);
        const newAvg = ((holding.avgBuyPrice * holding.quantity) + (price * quantity)) / newQty;
        holding.quantity = newQty;
        holding.avgBuyPrice = parseFloat(newAvg.toFixed(2));
        holding.currentPrice = price;
        await holding.save();
      } else {
        await Holding.create({
          user: req.user._id, symbol, companyName,
          quantity: parseInt(quantity), avgBuyPrice: price, currentPrice: price,
        });
      }
    }

    if (orderType === 'SELL') {
      const holding = await Holding.findOne({ user: req.user._id, symbol });
      if (!holding || holding.quantity < quantity)
        return res.status(400).json({ error: 'Insufficient holdings to sell.' });

      // Update holding
      holding.quantity -= parseInt(quantity);
      if (holding.quantity === 0) {
        await Holding.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }

      // Credit proceeds
      user.accountBalance += (totalValue - brokerage);
      user.totalInvested -= (holding.avgBuyPrice * quantity);
      await user.save();
    }

    const order = await Order.create({
      user: req.user._id, symbol, companyName, orderType,
      productType, orderVariety, quantity: parseInt(quantity),
      price, triggerPrice, status: 'EXECUTED',
    });

    res.status(201).json({ order, message: `Order ${orderType} ${quantity} ${symbol} executed successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/orders/:id - cancel pending order
router.delete('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    if (order.status !== 'PENDING')
      return res.status(400).json({ error: 'Only pending orders can be cancelled.' });
    order.status = 'CANCELLED';
    await order.save();
    res.json({ message: 'Order cancelled.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
