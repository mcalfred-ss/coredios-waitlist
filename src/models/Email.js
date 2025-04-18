// src/models/Email.js
const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  email:   { type: String, required: true, unique: true },
  joinedAt:{ type: Date,   default: Date.now      }
});

// Reuse existing model if it’s already been compiled
const Email = mongoose.models.Email || mongoose.model('Email', EmailSchema);

module.exports = Email;
