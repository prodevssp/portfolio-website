import nodemailer from "nodemailer";

// Configure the transporter with custom SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Your SMTP host
  port: process.env.SMTP_PORT, // SMTP port (usually 587 or 465 for secure)
  secure: process.env.SMTP_SECURE || false,
  auth: {
    user: process.env.SMTP_USER, // SMTP username
    pass: process.env.SMTP_PASS, // SMTP password
  },
});

const mailer = async ({ subject, html, to }) => {
  try {
    // Define email options
    const mailOptions = {
      from: process.env.SMTP_USER, // Sender details
      to, // Admin's email
      subject: subject || "Hey there!",
      html,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
  }
};

export default mailer;
