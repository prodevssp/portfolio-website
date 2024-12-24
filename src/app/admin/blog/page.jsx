"use client";

import React, { useEffect, useState, useMemo } from "react";
import BlogCard from "@/components/ui/BlogCard";

export default function Blogs({ category }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog data from /api/blog
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <section
      className="
        min-h-screen
        text-slate-900
        dark:text-slate-50
        bg-slate-50
        dark:bg-[#2C2D33]
        px-4
        py-12
        md:px-10
        flex
        flex-col
        items-center
        pt-24
      "
    >
      <div className="w-full max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-orange-500 text-3xl sm:text-4xl md:text-5xl font-bold capitalize">
            Blogs
          </h1>
        </div>

        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
          </div>
        )}

        {!loading && blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.slug}
                blog={blog}
                customCTA={"Edit"}
                customHref={`/admin/blog/${blog.slug}/edit`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
