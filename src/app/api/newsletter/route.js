import { db } from "@/firebase";
import mailer from "@/lib/mailer";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { email } = await request.json();

    // Check if email already exists
    const subscribersRef = collection(db, "subscribers");
    const q = query(subscribersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Email already exists
      return NextResponse.json(
        { error: "Email already subscribed!" },
        { status: 400 }
      );
    }

    // Add new email to Firestore
    await addDoc(subscribersRef, {
      email,
      subscribedAt: new Date(),
    });

    // Send welcome email
    await mailer({
      subject: "Welcome to Soumya's newsletter",
      html: "Thank you for subscribing to our newsletter. Stay tuned for updates!",
      to: email,
    });

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error subscribing user:", err);
    return NextResponse.json(
      { error: "Subscription failed!" },
      { status: 500 }
    );
  }
};
