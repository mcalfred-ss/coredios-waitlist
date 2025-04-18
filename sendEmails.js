// sendEmails.js
require('dotenv').config();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// 1) Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
});

// 2) Model (same as server.js)
const Email = mongoose.model('Email', new mongoose.Schema({
  email: String,
  dateJoined: Date
}));

// 3) Configure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 4) Fetch & send
async function blast() {
  const list = await Email.find().lean();
  for (let { email } of list) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🚀 Coredios Early Access!',
      text: `Hey there! Thanks for joining our waitlist…`
    });
    console.log(`Sent to ${email}`);
  }
  mongoose.disconnect();
}

blast().catch(console.error);
