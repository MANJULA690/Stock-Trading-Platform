const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
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
  exchange: {
    type: String,
    enum: ['NSE', 'BSE'],
    default: 'NSE',
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  avgBuyPrice: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: Number,
    default: 0,
  },
  sector: String,
}, { timestamps: true });

holdingSchema.virtual('investedValue').get(function () {
  return this.quantity * this.avgBuyPrice;
});

holdingSchema.virtual('currentValue').get(function () {
  return this.quantity * (this.currentPrice || this.avgBuyPrice);
});

holdingSchema.virtual('pnl').get(function () {
  return this.currentValue - this.investedValue;
});

holdingSchema.virtual('pnlPercent').get(function () {
  if (this.investedValue === 0) return 0;
  return ((this.pnl / this.investedValue) * 100).toFixed(2);
});

holdingSchema.set('toJSON', { virtuals: true });
holdingSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Holding', holdingSchema);
