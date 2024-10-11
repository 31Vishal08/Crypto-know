// routes/stats.js
const express = require('express');
const router = express.Router();
const Price = require('../models/Price');
const calculateStandardDeviation = require('../utils/calculateDeviation');

// GET /api/stats?coin=bitcoin
router.get('/stats', async (req, res) => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid or missing coin parameter' });
  }

  try {
    const latestPrice = await Price.findOne({ coinId: coin }).sort({
      timestamp: -1,
    });

    if (!latestPrice) {
      return res
        .status(404)
        .json({ error: 'No data found for the requested coin' });
    }

    res.json({
      price: latestPrice.price,
      marketCap: latestPrice.marketCap,
      '24hChange': latestPrice.change24h,
    });
  } catch (error) {
    console.error('Error in /stats endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/deviation?coin=bitcoin
router.get('/deviation', async (req, res) => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid or missing coin parameter' });
  }

  try {
    const prices = await Price.find({ coinId: coin })
      .sort({ timestamp: -1 })
      .limit(100)
      .select('price');

    if (!prices.length) {
      return res
        .status(404)
        .json({ error: 'No data found for the requested coin' });
    }

    const priceValues = prices.map((p) => p.price);
    const deviation = calculateStandardDeviation(priceValues);

    res.json({
      deviation: parseFloat(deviation.toFixed(2)),
    });
  } catch (error) {
    console.error('Error in /deviation endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
