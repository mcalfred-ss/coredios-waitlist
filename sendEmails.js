// sendEmails.js
const Email = require('./src/models/Email');
const nodemailer = require('nodemailer');

// set up your SMTP transporter however you had it:
const transporter = nodemailer.createTransport({
  host: 'YOUR_SMTP_HOST',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendConfirmation(emailAddress) {
  // Save to Mongo (we already connected in server.js)
  await Email.create({ address: emailAddress });
  
  // Send mail
  await transporter.sendMail({
    from: '"Coredios Team" <no-reply@coredios.com>',
    to: emailAddress,
    subject: 'Thanks for joining the waitlist!',
    text: 'We’ll let you know as soon as we launch 🚀'
  });
}

module.exports = sendConfirmation;
