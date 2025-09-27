const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const router = express.Router();

// Gmail OAuth2 setup
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_EMAIL,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    });

    return transporter;
  } catch (error) {
    console.error('Error creating transporter:', error);
    throw error;
  }
};

// Send contact form email
router.post('/send', async (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Name, email, and message are required' 
      });
    }

    const transporter = await createTransporter();

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: process.env.GMAIL_EMAIL, // Send to admin email
      subject: `Contact Form: ${subject || 'New Message from ' + name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #4CAF50;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              This message was sent from the ICT Care contact form at ${new Date().toLocaleString('en-US', { timeZone: process.env.TIMEZONE || 'Asia/Dhaka' })}
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to the sender
    const confirmationMailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: 'Thank you for contacting ICT Care',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Thank you for reaching out!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your message:</h3>
            <p style="font-style: italic;">"${message}"</p>
          </div>
          <p>Best regards,<br>
          <strong>ICT Care Team</strong><br>
          Exclusive ICT Care Educational Platform</p>
        </div>
      `
    };

    await transporter.sendMail(confirmationMailOptions);

    res.json({ 
      message: 'Message sent successfully! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Send WhatsApp link (for frontend to redirect)
router.post('/whatsapp', (req, res) => {
  try {
    const { name, message } = req.body;
    
    const whatsappNumber = '+8801700000000'; // Replace with actual WhatsApp number
    const encodedMessage = encodeURIComponent(
      `Hi, I'm ${name}. ${message}`
    );
    
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    
    res.json({ 
      whatsappUrl,
      message: 'WhatsApp link generated successfully' 
    });
  } catch (error) {
    console.error('WhatsApp link error:', error);
    res.status(500).json({ 
      message: 'Failed to generate WhatsApp link' 
    });
  }
});

module.exports = router;