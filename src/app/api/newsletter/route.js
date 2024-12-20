import { db } from "@/firebase";
import mailer from "@/lib/mailer";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required!" },
        { status: 400 }
      );
    }

    const subscribersRef = collection(db, "subscribers");
    const q = query(subscribersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const existingSubscriber = querySnapshot.docs[0];
      const subscriberData = existingSubscriber.data();

      if (subscriberData.subscribed) {
        return NextResponse.json(
          { error: "Email is already subscribed!" },
          { status: 400 }
        );
      }

      // Re-subscribe an unsubscribed user
      const subscriberDoc = doc(db, "subscribers", existingSubscriber.id);
      await updateDoc(subscriberDoc, { subscribed: true });

      await mailer({
        subject: "Welcome back to Soumya's newsletter!",
        html: "Thank you for resubscribing to our newsletter. Stay tuned for updates!",
        to: email,
      });

      return NextResponse.json(
        { message: "Successfully resubscribed!" },
        { status: 200 }
      );
    }

    // Add a new subscriber
    await addDoc(subscribersRef, {
      email,
      subscribedAt: new Date(),
      subscribed: true, // New field to track subscription status
    });

    await mailer({
      subject: "Welcome to Soumya's newsletter!",
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
