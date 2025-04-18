const express = require('express');
const router = express.Router();
const Email = require('../models/Email');

router.post('/join', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  try {
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).json({ success: true, message: 'Email saved' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
