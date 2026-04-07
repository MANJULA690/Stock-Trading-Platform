const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  category: {
    type: String,
    enum: ['account', 'trading', 'payment', 'technical', 'other'],
    default: 'other',
  },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open',
  },
  ticketId: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

ticketSchema.pre('save', function (next) {
  if (!this.ticketId) {
    this.ticketId = 'TKT-' + Date.now().toString(36).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Ticket', ticketSchema);
