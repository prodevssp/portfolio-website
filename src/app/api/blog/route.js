import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export const GET = async (request) => {
  try {
    // Reference the blogs collection in Firestore
    const blogsRef = collection(db, "blogs");
    const snapshot = await getDocs(blogsRef);

    // Map through the Firestore documents and format the blog data
    const blogPosts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Respond with the blog posts
    return new Response(JSON.stringify(blogPosts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle errors by returning an error response
    return new Response(
      JSON.stringify({ error: "Failed to load blog posts." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

export const POST = async (request) => {
  const blogsRef = collection(db, "blogs");
  const blog = await request.json();

  try {
    // Add a new blog document to the Firestore collection
    await addDoc(blogsRef, {
      title: blog.title,
      summary: blog.summary,
      slug: blog.slug,
      publishedAt: blog.publishedAt,
      content: blog.content,
      notified: false,
      status: blog.status,
      coverImage: blog.coverImage,
      keywords: blog.keywords,
      likes: 0,
      category: blog.category,
      likedBy: [],
    });

    // Respond with a success message
    return new Response(
      JSON.stringify({ message: "Blog added successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    // Handle errors by returning an error response
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to add blog." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
