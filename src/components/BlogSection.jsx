"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import config, { blogsCategories } from "@/lib/config";
import BlogCard from "@/components/ui/BlogCard";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  // Fetch all blogs on mount
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

  // Group by category, pick most recent
  const latestBlogsPerCategory = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];
    const map = new Map();
    for (const blog of blogs) {
      const cat = blog.metadata.category?.trim() || "General";
      if (!map.has(cat)) {
        map.set(cat, [blog]);
      } else {
        map.get(cat).push(blog);
      }
    }
    const result = [];
    for (const [cat, posts] of map.entries()) {
      posts.sort(
        (a, b) =>
          new Date(b.metadata.publishedAt) - new Date(a.metadata.publishedAt),
      );
      result.push(posts[0]); // most recent
    }
    return result;
  }, [blogs]);

  // Slider settings
  const settings = {
    dots: true,
    infinite: latestBlogsPerCategory.length > 2,
    arrows: true,
    speed: 500,
    slidesToShow: Math.min(3, latestBlogsPerCategory.length),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, latestBlogsPerCategory.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div className="mt-8">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
  };

  // If the data or settings change, reset slider to the first slide
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [latestBlogsPerCategory]);

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#2C2D33] md:px-10" id="blog">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-orange-500 text-4xl font-semibold">
          {config.blogsHeading.title}
        </h2>
        <h3 className="text-xl font-bold mt-2 text-gray-400">
          {config.blogsHeading.description}
        </h3>
      </div>

      {/* Example of listing categories at top, if you like: */}
      <div className="flex flex-wrap justify-center space-x-4 mt-8">
        {blogsCategories.map((category) => (
          <Link
            key={category}
            href={`/blog/category/${encodeURIComponent(category)}`}
            className="text-base sm:text-lg md:text-xl font-medium mb-2 md:mb-0 px-3 py-1 rounded text-gray-500 hover:text-orange-500"
          >
            {category}
          </Link>
        ))}
      </div>

      <div className="mt-12 max-w-7xl mx-auto">
        {loading ? (
          // Show loader
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
          </div>
        ) : latestBlogsPerCategory.length === 0 ? (
          // No blogs at all
          <p className="text-center text-gray-500">No blog posts found</p>
        ) : latestBlogsPerCategory.length === 1 ? (
          // Just 1 total blog
          <div className="flex justify-center px-2 mt-8">
            <div className="w-full max-w-md">
              <BlogCard blog={latestBlogsPerCategory[0]} />
            </div>
          </div>
        ) : (
          // Multiple => show slider
          <Slider ref={sliderRef} {...settings}>
            {latestBlogsPerCategory.map((blog) => (
              <div key={blog.slug} className="px-2 h-full">
                <BlogCard blog={blog} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
