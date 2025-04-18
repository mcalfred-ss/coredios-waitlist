// src/routes/joinRoute.js
const express = require('express');
const router  = express.Router();
const sendConfirmation = require('../../sendEmails');

router.post('/', async (req, res) => {
  const { email } = req.body;
  try {
    await sendConfirmation(email);
    res.redirect('/thankyou.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding to waitlist');
  }
});

module.exports = router;
