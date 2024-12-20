const generateWelcomeToNewsletterTemplate = ({ unsubscribeUrl, appUrl }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f3f4f6; /* Tailwind gray-100 hex */
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
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Increased shadow for card */
        }
        .header {
          background-color: #f97316; /* Tailwind orange-500 hex */
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
          background-color: #f97316; /* Tailwind orange-500 hex */
          border-radius: 8px; /* Rounded corners */
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Button shadow */
          transition: background-color 0.3s, box-shadow 0.3s; /* Smooth hover transition */
        }
        .button:visited {
          color: #ffffff !important;
        }
        .button:hover {
          background-color: #ea580c; /* Tailwind orange-600 hex */
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
        }
        .button:active {
          background-color: #c2410c; /* Tailwind orange-700 hex */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow on click */
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
          color: #999;
        }
        .footer a {
          color: #f97316; /* Tailwind orange-500 hex */
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Our Newsletter!</h1>
        </div>
        <div class="content">
          <h2>Hi there,</h2>
          <p>Thank you for subscribing to our newsletter! We're excited to have you on board.</p>
          <p>From now on, you'll receive updates about our latest blogs, tips, and exclusive content right in your inbox.</p>
          <p>Feel free to explore our website and discover more:</p>
          <p style="text-align: center; margin: 20px 0;">
            <a href="${appUrl}" class="button">Visit Our Website</a>
          </p>
        </div>
        <div class="footer">
          <p>If you didn't subscribe to our newsletter, you can <a href="${unsubscribeUrl}">unsubscribe here</a>.</p>
          <p>Thank you for being a part of our community!</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default generateWelcomeToNewsletterTemplate;
