const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true,
  },
  companyName: String,
  orderType: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: true,
  },
  productType: {
    type: String,
    enum: ['CNC', 'MIS', 'NRML'],
    default: 'CNC',
  },
  orderVariety: {
    type: String,
    enum: ['MARKET', 'LIMIT', 'SL', 'SL-M'],
    default: 'MARKET',
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  triggerPrice: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['PENDING', 'EXECUTED', 'CANCELLED', 'REJECTED'],
    default: 'EXECUTED',
  },
  executedAt: {
    type: Date,
    default: Date.now,
  },
  totalValue: {
    type: Number,
  },
  brokerage: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

orderSchema.pre('save', function (next) {
  this.totalValue = this.quantity * this.price;
  // Flat fee: ₹20 per executed order or 0.03% whichever is lower
  this.brokerage = Math.min(20, this.totalValue * 0.0003);
  next();
});

module.exports = mongoose.model('Order', orderSchema);
