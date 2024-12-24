import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const POST = async (request) => {
  const { slug, ...blogData } = await request.json(); // Expect `slug` in the request payload

  try {
    // Query the blogs collection to find the document with the matching slug
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // If no matching document is found, return an error response
      return new Response(JSON.stringify({ error: "Blog not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get the document reference of the first matching blog
    const blogDoc = querySnapshot.docs[0].ref;

    // Update the blog document with new data
    await updateDoc(blogDoc, {
      title: blogData.title,
      summary: blogData.summary,
      publishedAt: blogData.publishedAt,
      content: blogData.content,
      status: blogData.status,
      coverImage: blogData.coverImage,
      keywords: blogData.keywords,
      category: blogData.category,
    });

    // Respond with a success message
    return new Response(
      JSON.stringify({ message: "Blog updated successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    // Handle errors by returning an error response
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to update blog." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
