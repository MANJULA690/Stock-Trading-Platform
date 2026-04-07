const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  stocks: [{
    symbol: { type: String, uppercase: true },
    companyName: String,
    exchange: { type: String, default: 'NSE' },
    addedAt: { type: Date, default: Date.now },
  }],
});

module.exports = mongoose.model('Watchlist', watchlistSchema);
