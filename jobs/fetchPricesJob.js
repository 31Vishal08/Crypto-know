// jobs/fetchPricesJob.js
const Price = require('../models/Price');
const { getCoinData } = require('../services/coinGeckoService');

const coinIds = ['bitcoin', 'matic-network', 'ethereum'];

const fetchPricesJob = async () => {
  console.log('Running fetchPricesJob at', new Date());
  try {
    const coinData = await getCoinData(coinIds);

    const priceDocuments = coinData.map((coin) => ({
      coinId: coin.id,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      timestamp: new Date(), 
    }));

    await Price.insertMany(priceDocuments);
    console.log('Prices updated successfully');
  } catch (error) {
    console.error('Error in fetchPricesJob:', error);
  }
};

module.exports = fetchPricesJob;
