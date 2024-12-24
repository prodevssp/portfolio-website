import { addDoc, collection } from "firebase/firestore";
import { getBlogPosts } from "../../db/blog";
import { db } from "@/firebase";

export const GET = async (request) => {
  try {
    const blogPosts = getBlogPosts();
    return new Response(JSON.stringify(blogPosts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
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
    await addDoc(blogsRef, {
      title: blog.title,
      summary: blog.summary,
      slug: blog.slug,
      publishedAt: blog.publishedAt,
      content: JSON.stringify(blog.content),
      notified: false,
      status: blog.status,
      coverImage: blog.coverImage,
      keywords: blog.keywords,
      likes: 0,
    });
    return new Response(
      JSON.stringify({ message: "Blog added successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add blog." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
