import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { slug } = params;

    // Reference the blogs collection in Firestore
    const blogsRef = collection(db, "blogs");

    // Query Firestore to find the blog with the matching slug
    const blogQuery = query(blogsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(blogQuery);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Extract the blog data (assuming the slug is unique, so only one result)
    const blogDoc = querySnapshot.docs[0];
    const blogData = blogDoc.data();

    // Return the blog data
    return NextResponse.json({
      slug,
      title: blogData.title,
      summary: blogData.summary,
      publishedAt: blogData.publishedAt,
      keywords: blogData.keywords,
      coverImage: blogData.coverImage,
      status: blogData.status,
      content: blogData.content,
    });
  } catch (error) {
    console.error("Error fetching single blog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
