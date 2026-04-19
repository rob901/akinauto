const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ─── Send Email Route ─────────────────────────────────────────
app.post('/send-message', async (req, res) => {
  const { name, phone, email, vehicle, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields.' });
  }

  // Configure transporter using environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Akin Automotive Website" <${process.env.MAIL_USER}>`,
    to: 'rob.bouch901@gmail.com',
    replyTo: email,
    subject: `New Contact Form Message from ${name}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f4f6f8; padding: 20px;">
        <div style="background: #0f1923; padding: 24px 28px; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; font-size: 20px; margin: 0;">New Message — Akin Automotive</h1>
        </div>
        <div style="background: #ffffff; padding: 28px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #e63c2f; width: 130px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1a1a2e;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #e63c2f; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1a1a2e;">${email}</td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #e63c2f; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1a1a2e;">${phone}</td>
            </tr>` : ''}
            ${vehicle ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #e63c2f; vertical-align: top;">Vehicle</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1a1a2e;">${vehicle}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #e63c2f; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #1a1a2e; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #a0aec0;">
            This message was submitted via the Akin Automotive website contact form.<br/>
            Reply to this email to respond directly to ${name}.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✓ Akin Automotive site running at http://localhost:${PORT}`);
});
