// server.js
require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const joinRoute = require('./src/routes/joinRoute');

const app = express();

// 1) Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 2) Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3) Static files
app.use(express.static(path.join(__dirname, 'public')));

// 4) API route
app.use('/api/join', joinRoute);

// 5) Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
