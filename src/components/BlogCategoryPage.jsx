"use client";

import React, { useEffect, useState, useMemo } from "react";
import BlogCard from "@/components/ui/BlogCard";

export default function CategoryClient({ category }) {
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

  // Filter & sort the blogs in descending order by publish date
  const filteredBlogs = useMemo(() => {
    const lowerCat = category.trim().toLowerCase();
    return blogs.filter(
      (b) => b?.category && b.category.trim().toLowerCase() === lowerCat,
    );
  }, [blogs, category]);

  const sortedBlogs = useMemo(() => {
    return [...filteredBlogs].sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
    );
  }, [filteredBlogs]);

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
            {category} Blogs
          </h1>
          <p className="mt-2 text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-300">
            Explore all the latest posts on <strong>{category}</strong>.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
          </div>
        )}

        {!loading && sortedBlogs.length === 0 ? (
          <p className="text-center text-gray-500">
            No blog posts found in “{category}”
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
