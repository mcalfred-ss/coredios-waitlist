const Email = require('./src/models/Email');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendConfirmation(emailAddress) {
  await Email.create({ email: emailAddress });

  const mailOptions = {
    from: '"Coredios Team" <no-reply@coredios.com>',
    to: emailAddress,
    subject: '🎮 Thanks for Joining the Coredios Waitlist!',
    text: `Thanks for joining the waitlist! We’re excited to have you onboard.

Stay tuned — we’ll notify you as soon as the game launches!

Follow us here: https://linktr.ee/corediosgames?utm_source=linktree_profile_share&ltsid=fbaf79bd-4843-4195-b9e1-11f4ce29632d
`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #4CAF50;">🎉 Welcome to the Coredios Waitlist!</h2>
        <p>Hey there!</p>
        <p>Thank you for joining our waitlist. You're officially part of the early access crew for our upcoming game release.</p>
        <p>We’ll keep you updated with exclusive news and sneak peeks as we approach launch day!</p>
        <p style="margin-top: 20px;">
          🔗 <strong>Follow us:</strong><br/>
          <a href="https://linktr.ee/corediosgames?utm_source=linktree_profile_share&ltsid=fbaf79bd-4843-4195-b9e1-11f4ce29632d" target="_blank">
            https://linktr.ee/corediosgames
          </a>
        </p>
        <br/>
        <p>— The Coredios Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendConfirmation;
