import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import mailer from "@/lib/mailer";
import generateWelcomeToNewsletterTemplate from "@/lib/emails/welcomeToNewsletter";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return Response.json(
        {
          error: "Invalid verification token",
        },
        { status: 400 }
      );
    }

    // Find the pending verification
    const pendingRef = collection(db, "pendingNewsletterVerifications");
    const q = query(pendingRef, where("token", "==", token));
    const querySnapshot = await getDocs(q);

    console.log(querySnapshot);

    if (querySnapshot.empty) {
      return Response.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const verification = querySnapshot.docs[0];
    const { email, expiresAt } = verification.data();

    // Check if token is expired
    if (new Date(expiresAt.toDate()) < new Date()) {
      await deleteDoc(
        doc(db, "pendingNewsletterVerifications", verification.id)
      );
      return Response.json(
        { error: "Verification link has expired" },
        { status: 400 }
      );
    }

    // Add to confirmed subscribers
    await addDoc(collection(db, "subscribers"), {
      email,
      subscribedAt: new Date(),
      subscribed: true,
    });

    // Delete the pending verification
    await deleteDoc(doc(db, "pendingNewsletterVerifications", verification.id));

    // Send welcome email
    await mailer({
      to: email,
      subject: "Welcome to our newsletter!",
      html: generateWelcomeToNewsletterTemplate({
        unsubscribeUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/${email}/unsubscribe`,
        appUrl: process.env.NEXT_PUBLIC_APP_URL,
      }),
    });

    // Redirect to success page
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/newsletter-success`
    );
  } catch (error) {
    console.error("Newsletter verification error:", error);
    return Response.json(
      {
        error: "Failed to verify subscription",
      },
      { status: 500 }
    );
  }
}
