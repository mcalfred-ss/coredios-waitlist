// server.js
require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const joinRoute = require('./src/routes/joinRoute');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// API route
app.use('/api/join', joinRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
