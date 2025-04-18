// src/routes/joinRoute.js
const express = require('express');
const router  = express.Router();
const sendConfirmation = require('../../sendEmails');

router.post('/', async (req, res) => {
  const { email } = req.body;
  try {
    await sendConfirmation(email);
    // New signup: email sent & DB insert ok
    return res.redirect('/thankyou.html');
  } catch (err) {
    console.error(err);

    // If it’s a duplicate‑key on the `email` field, treat as success
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.redirect('/thankyou.html');
    }

    // Otherwise it’s a real error
    return res.status(500).send('Error adding to waitlist');
  }
});

module.exports = router;
