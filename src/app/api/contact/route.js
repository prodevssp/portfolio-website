import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import mailer from "@/lib/mailer";

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

    // Store the contact request in Firebase Firestore
    await addDoc(collection(db, "contactRequests"), {
      name,
      email,
      phone: phone || "Not provided",
      subject: subject || "No subject",
      message,
      createdAt: new Date(),
    });

    // Send email notification to the admin
    await mailer({
      subject: `New contact request received: ${subject || "No subject"}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      to: process.env.ADMIN_EMAIL,
    });

    return new Response(
      JSON.stringify({ message: "Contact request submitted successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact request:", error);
    return new Response(
      JSON.stringify({
        message: "Error processing contact request. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
