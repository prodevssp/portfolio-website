import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { email } = params;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required!" },
        { status: 400 }
      );
    }

    const subscribersRef = collection(db, "subscribers");
    const q = query(subscribersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Email not found!" }, { status: 404 });
    }

    // Unsubscribe the user
    const subscriberDoc = doc(db, "subscribers", querySnapshot.docs[0].id);
    await updateDoc(subscriberDoc, { subscribed: false });

    return NextResponse.json(
      { message: "Successfully unsubscribed!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error unsubscribing user:", err);
    return NextResponse.json({ error: "Unsubscribe failed!" }, { status: 500 });
  }
};
