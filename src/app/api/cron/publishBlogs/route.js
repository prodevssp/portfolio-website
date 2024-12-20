import { db } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getBlogPosts } from "@/app/db/blog";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const blogPosts = await getBlogPosts();
    const blogsRef = collection(db, "blogs");

    // Fetch existing blog slugs from Firestore
    const existingBlogsSnapshot = await getDocs(blogsRef);
    const existingSlugs = existingBlogsSnapshot.docs.map(
      (doc) => doc.data().slug
    );

    for (const blog of blogPosts) {
      if (!existingSlugs.includes(blog.slug)) {
        // Add new blog to Firestore
        await addDoc(blogsRef, {
          title: blog.metadata.title,
          summary: blog.metadata.summary,
          slug: blog.slug,
          publishedAt: blog.metadata.publishedAt,
          notified: false, // Mark as not notified
        });
        console.log(`Pushed blog to DB: ${blog.metadata.title}`);
      }
    }

    return NextResponse.json({ message: "Cron job executed successfully!" });
  } catch (error) {
    console.error("Error publishing new blogs:", error);
    return NextResponse.json(
      { error: "Cron job execution failed!" },
      { status: 500 }
    );
  }
};
