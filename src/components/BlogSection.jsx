"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample blog data
const blogs = [
  {
    id: 1,
    category: "Web Development",
    title: "Jim Morrison Says When the Music's Over Turn Off the Light",
    date: "23 Dec",
    image: "/assets/project.png", // Replace with your actual image path
    link: "#", // Optional: Add a link to the blog post
  },
  {
    id: 2,
    category: "Branding",
    title: "How to Be Appreciated for Your Hard Work as a Developer",
    date: "23 Dec",
    image: "/assets/project.png",
    link: "#",
  },
  {
    id: 3,
    category: "Social Media",
    title: "How Designers and Developers Can Collaborate Better",
    date: "23 Dec",
    image: "/assets/project.png",
    link: "#",
  },
];

const BlogSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false, // Set to true if you want navigation arrows
    speed: 500,
    slidesToShow: 3, // Number of slides to show on large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // For medium screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // For small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div className="mt-8">
        {/* Customize dot styles if needed */}
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#2C2D33] md:px-10" id="blog">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-orange-500 text-lg font-semibold">From My Blog</h2>
        <h3 className="text-4xl font-bold mt-2 dark:text-slate-50 text-slate-800">
          Our Recent Updates, Blog, Tips, Tricks & More
        </h3>
      </div>

      <div className="mt-12  max-w-7xl mx-auto">
        <Slider {...settings}>
          {blogs.map((blog) => (
            <div key={blog.id} className="px-2">
              <div className="relative dark:bg-[#4b4f5c] hover:scale-105 bg-slate-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-slate-50 text-center text-sm px-3 py-1 rounded-md shadow-md">
                  <p>{blog.date.split(" ")[0]}</p>
                  <p>{blog.date.split(" ")[1]}</p>
                </div>
                <div className="p-6">
                  <p className="text-orange-500 font-semibold">
                    {blog.category}
                  </p>
                  <h4 className="text-xl font-bold dark:text-slate-50 text-gray-900 mt-2">
                    {blog.title}
                  </h4>
                  {blog.link && (
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-4 py-2 text-sm font-semibold text-orange-500 border border-orange-500 rounded hover:bg-orange-500 hover:text-slate-50 transition"
                    >
                      Read More
                    </a>
                  )}
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
