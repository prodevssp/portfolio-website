import mailer from "@/lib/mailer";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Please fill in all required fields." }),
        { status: 400 }
      );
    }

    mailer({
      subject: `New contact request received: ${subject}`,
      html: ` Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Message: ${message}`,
      to: process.env.ADMIN_EMAIL,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        message: "Error sending email. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
