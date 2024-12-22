"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import formatDate from "../lib/formatDate";
import calculateEstimateReadingTime from "../lib/calculateEstimateReadingTime";
import Link from "next/link";
import config, { blogsCategories } from "@/lib/config";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const sliderRef = useRef(null);

  // Fetch the blogs on component mount
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

  // Filter the blogs based on the active category
  const filteredBlogs = useMemo(() => {
    if (activeFilter === "All") return blogs;
    return blogs.filter(
      (b) =>
        b.metadata.category.trim().toLowerCase() ===
        activeFilter.trim().toLowerCase(),
    );
  }, [activeFilter, blogs]);

  // Reset the slider to the first slide whenever the filtered blogs change
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [filteredBlogs]);

  // Slider settings
  const settings = {
    key: filteredBlogs.length,
    dots: true,
    infinite: filteredBlogs.length > 2, // Enable infinite only if > 2 items
    arrows: true,
    speed: 500,
    slidesToShow: Math.min(3, filteredBlogs.length),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, filteredBlogs.length),
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

  // Single-blog layout (similar to your PortfolioSection)
  const SingleBlogCard = ({ blog }) => (
    <div className="flex justify-center">
      <div className="w-full max-w-md px-2">
        <div className="relative h-full dark:bg-[#4b4f5c] hover:scale-105 bg-slate-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300">
          <img
            src={
              blog.metadata.coverImage || "/assets/backgrounds/default-blog.jpg"
            }
            alt={blog.metadata.title}
            className="w-full h-56 object-cover"
          />
          <div className="absolute top-4 left-4 bg-orange-500 text-slate-50 text-center text-sm px-3 py-1 rounded-md shadow-md">
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
    </div>
  );

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

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center space-x-4 mt-8">
        {blogsCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(category)}
            className={`text-base sm:text-lg md:text-xl font-medium mb-2 md:mb-0 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              activeFilter === category
                ? "text-orange-500 underline"
                : "text-gray-500 hover:text-orange-500"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-12 max-w-7xl mx-auto">
        {loading ? (
          // Show loader if still fetching
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
          </div>
        ) : filteredBlogs && filteredBlogs.length > 0 ? (
          filteredBlogs.length === 1 ? (
            // If there's exactly 1 blog, render the single-blog layout
            <SingleBlogCard blog={filteredBlogs[0]} />
          ) : (
            // Otherwise, render the slider
            <Slider ref={sliderRef} {...settings}>
              {filteredBlogs
                .sort((a, b) => {
                  // Sort in descending order by publish date
                  return (
                    new Date(b.metadata.publishedAt) -
                    new Date(a.metadata.publishedAt)
                  );
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
                      <div className="absolute top-4 left-4 bg-orange-500 text-slate-50 text-center text-sm px-3 py-1 rounded-md shadow-md">
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
          )
        ) : (
          // If there are no blogs after filtering
          <p className="text-center text-gray-500">No blog posts found</p>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
