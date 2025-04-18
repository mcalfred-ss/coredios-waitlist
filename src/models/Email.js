// src/models/Email.js
const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  joinedAt: { type: Date, default: Date.now }
});

// If the model is already compiled, reuse it; otherwise compile it now.
const Email = mongoose.models.Email || mongoose.model('Email', EmailSchema);

module.exports = Email;
