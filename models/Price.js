// models/Price.js
const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    enum: ['bitcoin', 'matic-network', 'ethereum'],
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Price', PriceSchema);
