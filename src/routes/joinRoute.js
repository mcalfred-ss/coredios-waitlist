const express = require('express');
const router = express.Router();
const sendConfirmation = require('../../sendEmails');

router.post('/join', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    await sendConfirmation(email);
    res.redirect('/thankyou.html'); // Redirect to thank-you page
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to save email or send message');
  }
});

module.exports = router;
