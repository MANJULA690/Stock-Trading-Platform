const express = require('express');
const router = express.Router();

// Mock stock data with realistic Indian market stocks
const STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', sector: 'Energy', exchange: 'NSE', basePrice: 2945.50 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', exchange: 'NSE', basePrice: 3812.00 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', sector: 'Banking', exchange: 'NSE', basePrice: 1723.40 },
  { symbol: 'INFY', name: 'Infosys Ltd', sector: 'IT', exchange: 'NSE', basePrice: 1456.75 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', sector: 'Banking', exchange: 'NSE', basePrice: 1089.60 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', sector: 'FMCG', exchange: 'NSE', basePrice: 2387.30 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', sector: 'Telecom', exchange: 'NSE', basePrice: 1534.20 },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', exchange: 'NSE', basePrice: 812.45 },
  { symbol: 'WIPRO', name: 'Wipro Ltd', sector: 'IT', exchange: 'NSE', basePrice: 478.90 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', sector: 'Auto', exchange: 'NSE', basePrice: 12430.00 },
  { symbol: 'AXISBANK', name: 'Axis Bank Ltd', sector: 'Banking', exchange: 'NSE', basePrice: 1087.55 },
  { symbol: 'LT', name: 'Larsen & Toubro Ltd', sector: 'Infrastructure', exchange: 'NSE', basePrice: 3567.80 },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries', sector: 'Pharma', exchange: 'NSE', basePrice: 1623.45 },
  { symbol: 'TITAN', name: 'Titan Company Ltd', sector: 'Consumer', exchange: 'NSE', basePrice: 3234.00 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', sector: 'Finance', exchange: 'NSE', basePrice: 7123.60 },
  { symbol: 'ADANIENT', name: 'Adani Enterprises Ltd', sector: 'Conglomerate', exchange: 'NSE', basePrice: 2876.30 },
  { symbol: 'HCLTECH', name: 'HCL Technologies Ltd', sector: 'IT', exchange: 'NSE', basePrice: 1367.25 },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd', sector: 'Cement', exchange: 'NSE', basePrice: 9876.40 },
  { symbol: 'NESTLEIND', name: 'Nestle India Ltd', sector: 'FMCG', exchange: 'NSE', basePrice: 2456.70 },
  { symbol: 'POWERGRID', name: 'Power Grid Corporation', sector: 'Utilities', exchange: 'NSE', basePrice: 287.35 },
];

// Simulate live price with slight random fluctuation
function getLivePrice(basePrice) {
  const fluctuation = (Math.random() - 0.5) * 0.02; // ±1%
  return parseFloat((basePrice * (1 + fluctuation)).toFixed(2));
}

function getStockData(stock) {
  const price = getLivePrice(stock.basePrice);
  const prevClose = parseFloat((stock.basePrice * (1 + (Math.random() - 0.5) * 0.015)).toFixed(2));
  const change = parseFloat((price - prevClose).toFixed(2));
  const changePercent = parseFloat(((change / prevClose) * 100).toFixed(2));
  return {
    ...stock,
    price,
    prevClose,
    change,
    changePercent,
    volume: Math.floor(Math.random() * 5000000) + 100000,
    high: parseFloat((price * 1.02).toFixed(2)),
    low: parseFloat((price * 0.98).toFixed(2)),
    marketCap: parseFloat((price * (Math.random() * 100 + 50) * 1e7).toFixed(0)),
    pe: parseFloat((Math.random() * 30 + 10).toFixed(2)),
    week52High: parseFloat((price * 1.35).toFixed(2)),
    week52Low: parseFloat((price * 0.72).toFixed(2)),
  };
}

// GET /api/stocks - all stocks
router.get('/', (req, res) => {
  const { search, sector } = req.query;
  let result = STOCKS.map(getStockData);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(s => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
  }
  if (sector) {
    result = result.filter(s => s.sector.toLowerCase() === sector.toLowerCase());
  }
  res.json({ stocks: result, count: result.length });
});

// GET /api/stocks/sectors
router.get('/sectors', (req, res) => {
  const sectors = [...new Set(STOCKS.map(s => s.sector))];
  res.json({ sectors });
});

// GET /api/stocks/:symbol
router.get('/:symbol', (req, res) => {
  const stock = STOCKS.find(s => s.symbol === req.params.symbol.toUpperCase());
  if (!stock) return res.status(404).json({ error: 'Stock not found.' });

  // Generate historical chart data (30 days)
  const history = [];
  let price = stock.basePrice * 0.92;
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    price = price * (1 + (Math.random() - 0.48) * 0.025);
    history.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat((price * 0.998).toFixed(2)),
      high: parseFloat((price * 1.012).toFixed(2)),
      low: parseFloat((price * 0.988).toFixed(2)),
      close: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 5000000) + 100000,
    });
  }

  res.json({ stock: getStockData(stock), history });
});

module.exports = router;
