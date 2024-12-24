import { db } from "@/firebase";
import {
  updateDoc,
  increment,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { slug, userId } = await request.json();
    if (!slug || !userId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
    }

    const blogsRef = collection(db, "blogs");
    // Query Firestore to find the blog with the matching slug
    const blogQuery = query(blogsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(blogQuery);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const blogDoc = querySnapshot.docs[0];
    const blogData = blogDoc.data();
    const likedBy = blogData.likedBy || [];
    let updatedLikes, isLiked;

    if (likedBy.includes(userId)) {
      // Unlike logic
      updatedLikes = blogData.likes - 1;
      isLiked = false;
      await updateDoc(blogDoc.ref, {
        likes: increment(-1),
        likedBy: likedBy.filter((id) => id !== userId),
      });
    } else {
      // Like logic
      updatedLikes = blogData.likes + 1;
      isLiked = true;
      await updateDoc(blogDoc.ref, {
        likes: increment(1),
        likedBy: [...likedBy, userId],
      });
    }

    return NextResponse.json(
      { slug, likes: updatedLikes, isLiked },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error toggling likes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
