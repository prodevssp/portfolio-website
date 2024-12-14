import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Please fill in all required fields." }),
        { status: 400 },
      );
    }
    console.log(
      process.env.SMTP_HOST,
      process.env.SMTP_PORT,
      process.env.SMTP_SECURE,
      process.env.SMTP_USER,
      process.env.SMTP_PASS,
      process.env.ADMIN_EMAIL,
    );
    // Configure the transporter with custom SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // Your SMTP host
      port: process.env.SMTP_PORT, // SMTP port (usually 587 or 465 for secure)
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // SMTP username
        pass: process.env.SMTP_PASS, // SMTP password
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.SMTP_USER, // Sender details
      to: process.env.ADMIN_EMAIL, // Admin's email
      subject: subject || "No Subject",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Message: ${message}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        message: "Error sending email. Please try again later.",
      }),
      { status: 500 },
    );
  }
}
