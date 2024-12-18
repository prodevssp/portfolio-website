"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import formatDate from "../lib/formatDate";
import calculateEstimateReadingTime from "../lib/calculateEstimateReadingTime";
import Link from "next/link";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  console.log(blogs);

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
      }
    }
    fetchBlogs();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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

  if (!blogs.length) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#2C2D33] md:px-10" id="blog">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-orange-500 text-4xl font-semibold">From My Blog</h2>
        <h3 className="text-xl font-bold mt-2 text-gray-400">
          Our Recent Updates, Blog, Tips, Tricks & More
        </h3>
      </div>

      <div className="mt-12 max-w-7xl mx-auto">
        <Slider {...settings}>
          {blogs
            .sort((a, b) => {
              if (
                new Date(a.metadata.publishedAt) >
                new Date(b.metadata.publishedAt)
              ) {
                return -1;
              }
              return 1;
            })
            .map((blog) => (
              <div key={blog.slug} className="px-2 h-full">
                <div className="relative h-full dark:bg-[#4b4f5c] hover:scale-105 bg-slate-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300">
                  <img
                    src={
                      blog.metadata.coverImage ||
                      "/assets/backgrounds/default-blog.jpg"
                    }
                    alt={blog.metadata.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-500 text-slate-50 text-center text-sm px-3 py-1 rounded-md shadow-md">
                    <p>{formatDate(blog.metadata.publishedAt)}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-orange-500 font-semibold">
                      {blog.metadata.category || "General"}
                    </p>
                    <h4 className="text-xl font-bold dark:text-slate-50 text-gray-900 mt-2">
                      {blog.metadata.title}
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 mt-2">
                      {blog.metadata.summary}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      {calculateEstimateReadingTime(blog.content)} read
                    </p>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-block mt-4 px-4 py-2 text-sm font-semibold text-orange-500 border border-orange-500 rounded hover:bg-orange-500 hover:text-slate-50 transition"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default BlogSection;
