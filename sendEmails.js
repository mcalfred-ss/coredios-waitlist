// sendEmails.js
const Email      = require('./src/models/Email');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: false, // true if your SMTP requires SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendConfirmation(emailAddress) {
  // ✅ create a document using the `email` field
  await Email.create({ email: emailAddress });

  // send the confirmation email
  await transporter.sendMail({
    from:    '"Coredios Team" <no-reply@coredios.com>',
    to:       emailAddress,
    subject: 'Thanks for joining the waitlist!',
    text:    'We’ll let you know as soon as we launch 🚀'
  });
}

module.exports = sendConfirmation;
