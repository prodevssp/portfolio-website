"use client";

import formatDate from "@/lib/formatDate";
import Image from "next/image";
import { CustomMDX } from "./ui/Mdx";
import ScrollToTopButton from "./ui/ScrollToTop";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import LikeButton from "./ui/LikeButton";
import BlogCard from "./ui/BlogCard";
import { useMemo } from "react";

async function fetchBlogPost(slug) {
  try {
    const response = await fetch(`/api/blog/${slug}`);
    if (!response.ok) throw new Error("Failed to fetch blog post");
    return await response.json();
  } catch (err) {
    console.error("Error fetching blog post:", err);
    return null;
  }
}

async function fetchAllBlogs() {
  try {
    const response = await fetch(`/api/blog`);
    if (!response.ok) throw new Error("Failed to fetch all blogs");
    return await response.json();
  } catch (err) {
    console.error("Error fetching all blogs:", err);
    return [];
  }
}

export default function BlogPage({ slug }) {
  const [post, setPost] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogData, blogs] = await Promise.all([
          fetchBlogPost(slug),
          fetchAllBlogs(),
        ]);
        if (!blogData) {
          notFound();
          return;
        }
        setPost(blogData);
        setAllBlogs(blogs);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const moreLikeThis = useMemo(() => {
    if (!post || !post.keywords || !Array.isArray(post.keywords)) return [];
    const postKeywords = post.keywords.map((kw) => kw.toLowerCase());
    return allBlogs
      .filter(
        (blog) =>
          blog.slug !== post.slug &&
          blog.keywords.some((kw) => postKeywords.includes(kw.toLowerCase())),
      )
      .slice(0, 3); // Limit to 3 blogs
  }, [post, allBlogs]);

  const getGridClassName = (cardCount) => {
    const baseClasses = "grid gap-8 justify-items-center";
    if (cardCount === 1) {
      return `${baseClasses} grid-cols-1 max-w-md mx-auto`;
    } else if (cardCount === 2) {
      return `${baseClasses} grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto`;
    }
    return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
  };

  if (isLoading) {
    return (
      <section
        className="min-h-screen text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-[#2C2D33] flex items-center justify-center px-4 py-12 md:px-10"
        id="blog-post"
      >
        <p className="text-2xl font-semibold text-center">Loading...</p>
      </section>
    );
  }

  return (
    <section
      className="min-h-screen text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-[#2C2D33] flex items-center justify-center px-4 py-12 md:px-10"
      id="blog-post"
    >
      <div className="flex flex-col w-full max-w-6xl space-y-8 mt-20">
        <div className="text-center">
          <h2 className="text-orange-500 text-xl font-semibold mb-4">
            Blog Post
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {formatDate(post.publishedAt)}
          </p>
        </div>

        {post.coverImage && (
          <div className="w-full flex justify-center">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-lg max-w-full"
            />
          </div>
        )}

        <article className="prose prose-quoteless prose-neutral dark:prose-invert text-base sm:text-lg md:text-xl text-slate-800 dark:text-gray-400 w-full">
          <CustomMDX source={post.content} />
        </article>

        <LikeButton
          slug={slug}
          initialLikes={post.likes}
          likedBy={post.likedBy}
        />

        {moreLikeThis.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center text-orange-500">
              More Like This
            </h3>
            <div className={getGridClassName(moreLikeThis.length)}>
              {moreLikeThis.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </div>
        )}

        <ScrollToTopButton />
      </div>
    </section>
  );
}
