// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const fetchPricesJob = require('./jobs/fetchPricesJob');
const statsRoutes = require('./routes/stats');
const config = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api', statsRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Schedule Background Job
cron.schedule('0 */2 * * *', fetchPricesJob);

// Run the Job Immediately
fetchPricesJob();
