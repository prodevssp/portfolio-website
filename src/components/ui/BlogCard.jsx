"use client";
import React from "react";
import Link from "next/link";
import formatDate from "@/lib/formatDate";
import calculateEstimateReadingTime from "@/lib/calculateEstimateReadingTime";

export default function BlogCard({ blog }) {
  if (!blog || !blog.metadata) {
    return null; // or some fallback
  }

  return (
    <div className="relative h-full dark:bg-[#4b4f5c] hover:scale-105 bg-slate-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300">
      {/* Cover Image */}
      <img
        src={blog.metadata.coverImage || "/assets/backgrounds/default-blog.jpg"}
        alt={blog.metadata.title}
        className="w-full h-56 object-cover"
      />

      {/* Publish Date Overlay */}
      <div className="absolute top-4 left-4 bg-orange-500 text-slate-50 text-center text-sm px-3 py-1 rounded-md shadow-md">
        <p>{formatDate(blog.metadata.publishedAt)}</p>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Category label -> clickable link to /blog/category/[categoryName] */}
        <Link
          href={`/blog/category/${encodeURIComponent(
            blog.metadata.category || "General",
          )}`}
          className="text-orange-500 font-semibold underline cursor-pointer"
        >
          {blog.metadata.category || "General"}
        </Link>

        {/* Title */}
        <h4 className="text-xl font-bold dark:text-slate-50 text-gray-900 mt-2">
          {blog.metadata.title}
        </h4>

        {/* Summary */}
        <p className="text-neutral-700 dark:text-neutral-300 mt-2">
          {blog.metadata.summary}
        </p>

        {/* Reading Time */}
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          {calculateEstimateReadingTime(blog.content)} read
        </p>

        {/* "Read More" Link */}
        <Link
          href={`/blog/${blog.slug}`}
          className="inline-block mt-4 px-4 py-2 text-sm font-semibold text-orange-500 border border-orange-500 rounded hover:bg-orange-500 hover:text-slate-50 transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
