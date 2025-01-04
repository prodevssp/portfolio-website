export default function generateVerifyNewsletterTemplate({ verificationUrl }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f3f4f6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .header {
          background-color: #f97316;
          color: #ffffff;
          text-align: center;
          padding: 20px;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
        }
        .content h2 {
          color: #333;
          margin-top: 0;
        }
        .content p {
          line-height: 1.6;
          margin: 10px 0;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          color: #ffffff !important;
          background-color: #f97316;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Verify Your Email</h1>
        </div>
        <div class="content">
          <h2>Almost there!</h2>
          <p>Thank you for signing up for our newsletter. To complete your subscription, please click the button below:</p>
          <p style="text-align: center; margin: 20px 0;">
            <a href="${verificationUrl}" class="button">Verify Email</a>
          </p>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          <p>This verification link will expire in 24 hours.</p>
        </div>
        <div class="footer">
          <p>If you didn't request this verification, you can safely ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
