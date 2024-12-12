"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const sliderRef = useRef(null);

  const categories = [
    "All",
    "Youtube",
    "Vimeo",
    "Soundcloud",
    "Popup",
    "Detail",
  ];

  const projects = [
    {
      id: 1,
      category: "Youtube",
      image: "/assets/project.png",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 2,
      category: "Vimeo",
      image: "/assets/project.png",
      video: "https://player.vimeo.com/video/76979871",
      link: "https://vimeo.com/76979871",
    },
    {
      id: 3,
      category: "Soundcloud",
      image: "/assets/project.png",
      link: "https://soundcloud.com/",
    },
    {
      id: 4,
      category: "Popup",
      image: "/assets/project.png",
    },
    {
      id: 5,
      category: "Detail",
      image: "/assets/project.png",
      link: "https://example.com/detail",
    },
    {
      id: 6,
      category: "Youtube",
      image: "/assets/project.png",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  // Use useMemo to optimize filtering performance
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;

    // Use case-insensitive comparison and trim whitespace
    return projects.filter(
      (project) =>
        project.category.trim().toLowerCase() ===
        activeFilter.trim().toLowerCase(),
    );
  }, [activeFilter, projects]);

  // Automatically reinitialize slider when filtered projects change
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [filteredProjects]);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Slider settings with key to force re-render
  const settings = {
    key: filteredProjects.length,
    dots: true,
    infinite: filteredProjects.length > 3,
    arrows: false,
    speed: 500,
    slidesToShow: Math.min(3, filteredProjects.length),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, filteredProjects.length),
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

  return (
    <section className="py-16 bg-white text-gray-900 dark:bg-[#2C2D33] dark:text-slate-50 flex justify-center">
      <div className="max-w-7xl w-full px-6">
        <div className="text-center">
          <h2 className="text-orange-500 text-lg font-semibold">Portfolio</h2>
          <h3 className="text-4xl font-bold mt-2">My Amazing Works</h3>
          <p className="text-gray-500 text-lg mt-4">
            Most common methods for designing websites that work well on desktop
            is responsive and adaptive design.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center space-x-4 mt-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(category)}
              className={`text-lg font-medium ${
                activeFilter === category
                  ? "text-orange-500 underline"
                  : "text-gray-500 hover:text-orange-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Slider */}
        <div className="mt-12">
          {filteredProjects.length > 0 ? (
            <Slider ref={sliderRef} {...settings}>
              {filteredProjects.map((project) => (
                <div key={project.id} className="px-2">
                  <div
                    className="relative group overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer dark:bg-[#4B4F5C] bg-slate-50 mx-auto max-w-[800px]"
                    onClick={() => openModal(project)}
                  >
                    <Image
                      src={project.image}
                      alt={`Project ${project.id}`}
                      width={500}
                      height={500}
                      className="object-cover w-full h-56"
                      priority
                    />
                    <div className="absolute inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-slate-50 text-lg font-medium">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-gray-500">No projects found</p>
          )}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-slate-900 bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#4B4F5C] rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-slate-50"
                aria-label="Close Modal"
              >
                ✕
              </button>
              {selectedProject.video && (
                <div className="mb-6">
                  <iframe
                    width="100%"
                    height="315"
                    src={selectedProject.video}
                    title="Video Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              )}
              {selectedProject.link && (
                <p className="text-center">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 underline"
                  >
                    Visit Link
                  </a>
                </p>
              )}
              {!selectedProject.video && !selectedProject.link && (
                <p className="text-center">No additional details available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
