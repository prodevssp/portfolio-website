import { getBlogPosts } from "../../db/blog";

export async function GET(request) {
  try {
    const blogPosts = getBlogPosts();
    console.log(blogPosts);
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
      }
    );
  }
}
