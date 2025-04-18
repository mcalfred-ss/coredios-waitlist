// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 1) Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// 2) Mongoose model
const Email = mongoose.model('Email', new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  dateJoined: { type: Date, default: Date.now }
}));

// 3) API endpoint - UPDATED to handle duplicate emails gracefully
app.post('/api/join', async (req, res) => {
  try {
    // Check if email already exists
    const existingEmail = await Email.findOne({ email: req.body.email });
    
    if (existingEmail) {
      // Email already exists, but we'll return success anyway
      return res.json({ 
        success: true, 
        alreadyExists: true,
        message: "You're already on our waitlist!" 
      });
    }
    
    // If email doesn't exist, create new entry
    const entry = await Email.create({ email: req.body.email });
    res.json({ success: true, entry });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// 4) Add a route to get all emails (for admin purposes)
app.get('/api/emails', async (req, res) => {
  try {
    const emails = await Email.find();
    res.json({ success: true, count: emails.length, emails });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// 5) Serve static front‑end
app.use(express.static(path.join(__dirname, 'public')));

// 6) Catch-all route to redirect to index for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));