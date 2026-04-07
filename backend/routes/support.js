const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { protect } = require('../middleware/auth');

// POST /api/support/ticket - create ticket (public)
router.post('/ticket', async (req, res) => {
  try {
    const { name, email, subject, category, message } = req.body;
    if (!name || !email || !subject || !message)
      return res.status(400).json({ error: 'All fields are required.' });

    const ticket = await Ticket.create({ name, email, subject, category, message });
    res.status(201).json({
      ticket,
      message: `Ticket ${ticket.ticketId} created. We'll get back to you within 24 hours.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/support/tickets - get user's tickets (protected)
router.get('/tickets', protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.json({ tickets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/support/ticket/:ticketId - track a ticket
router.get('/ticket/:ticketId', async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });
    if (!ticket) return res.status(404).json({ error: 'Ticket not found.' });
    res.json({ ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
