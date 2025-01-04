import { db } from "@/firebase";
import mailer from "@/lib/mailer";
import generateVerifyNewsletterTemplate from "@/lib/emails/verifyNewsletter";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Generate a verification token
    const verificationToken = Buffer.from(email + Date.now()).toString(
      "base64"
    );

    // Store pending verification in Firebase
    await addDoc(collection(db, "pendingNewsletterVerifications"), {
      email,
      token: verificationToken,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiry
    });

    // Create verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/verify?token=${verificationToken}`;

    // Send verification email using existing mailer with consistent styling
    await mailer({
      to: email,
      subject: "Verify your newsletter subscription",
      html: generateVerifyNewsletterTemplate({ verificationUrl }),
    });

    return Response.json({
      message: "Verification email sent! Please check your inbox.",
    });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return Response.json(
      {
        error: "Failed to process signup request",
      },
      { status: 500 }
    );
  }
}
