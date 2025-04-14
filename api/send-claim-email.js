// server.js
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// API endpoint for sending claim emails
app.post('/api/send-claim-email', async (req, res) => {
  const { toEmail, itemTitle } = req.body;
  
  if (!toEmail || !itemTitle) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: `Item Claim Notification: "${itemTitle}"`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Item Claim Notification</h2>
        <p>Hello,</p>
        <p>Someone has successfully verified the product code for your found item: <strong>"${itemTitle}"</strong>.</p>
        <p>They may contact you soon to arrange collection of the item.</p>
        
        <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 16px 0;">
          <h3 style="margin-top: 0; color: #856404;">SECURITY REMINDER</h3>
          <p>When returning found items:</p>
          <ul style="padding-left: 20px;">
            <li>Ask questions that only the true owner would know about the item</li>
            <li>Consider meeting in a public place for safety</li>
            <li>Only return the item if you're confident about the person's authenticity</li>
          </ul>
        </div>
        
        <p>Thank you for using Back2u!</p>
        <p>Best regards,<br>Back2u Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Claim notification email sent to:', toEmail);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});