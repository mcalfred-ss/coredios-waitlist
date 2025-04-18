// server.js
require('dotenv').config();

const express   = require('express');
const mongoose  = require('mongoose');
const path      = require('path');
const joinRoute = require('./src/routes/joinRoute');

const app = express();

// parse JSON & form bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// mount our API
app.use('/api/join', joinRoute);

// connect to Mongo, then start the server
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

start();
