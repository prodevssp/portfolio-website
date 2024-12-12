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
      title: "YouTube Project",
      description: "This is a YouTube-based project.",
    },
    {
      id: 2,
      category: "Vimeo",
      image: "/assets/project.png",
      video: "https://player.vimeo.com/video/76979871",
      link: "https://vimeo.com/76979871",
      title: "Vimeo Project",
      description: "This is a Vimeo-based project.",
    },
    {
      id: 3,
      category: "Soundcloud",
      image: "/assets/project.png",
      link: "https://soundcloud.com/",
      title: "Soundcloud Project",
      description: "This is a Soundcloud-based project.",
    },
    {
      id: 4,
      category: "Popup",
      image: "/assets/project.png",
      title: "Popup Project",
      description: "This is a popup-based project.",
    },
    {
      id: 5,
      category: "Detail",
      image: "/assets/project.png",
      link: "https://example.com/detail",
      title: "Detail Project",
      description: "This is a detail-based project.",
    },
    {
      id: 6,
      category: "Youtube",
      image: "/assets/project.png",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "Another YouTube Project",
      description: "This is another YouTube-based project.",
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
    <section className="py-16 pb-32 dark:bg-[#2C2D33] bg-slate-50 flex justify-center">
      <div className="max-w-7xl w-full px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-orange-500">Portfolio</h2>
          <p className="text-2xl text-gray-400 mt-2">My Amazing Works</p>
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
            filteredProjects.length === 1 ? (
              <div className="flex justify-center">
                <div className="w-full max-w-md px-2">
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="h-full mb-2">
                      <div className="h-full dark:bg-[#4B4F5C] hover:scale-105 bg-slate-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300">
                        <Image
                          src={project.image}
                          alt={`Project ${project.id}`}
                          width={500}
                          height={500}
                          className="h-56 object-cover w-full"
                          priority
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-bold dark:text-slate-50 text-slate-800">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-2">
                            {project.description}
                          </p>
                          <button
                            onClick={() => openModal(project)}
                            className="inline-block mt-4 px-4 py-2 text-sm font-semibold text-orange-500 border border-orange-500 rounded hover:bg-orange-500 hover:text-slate-50 transition"
                          >
                            Know More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Slider ref={sliderRef} {...settings}>
                {filteredProjects.map((project) => (
                  <div key={project.id} className="px-2 h-full mb-2">
                    <div className="h-full dark:bg-[#4B4F5C] hover:scale-105 bg-slate-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300">
                      <Image
                        src={project.image}
                        alt={`Project ${project.id}`}
                        width={500}
                        height={500}
                        className="h-56 object-cover w-full"
                        priority
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-bold dark:text-slate-50 text-slate-800">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-2">
                          {project.description}
                        </p>
                        <button
                          onClick={() => openModal(project)}
                          className="inline-block mt-4 px-4 py-2 text-sm font-semibold text-orange-500 border border-orange-500 rounded hover:bg-orange-500 hover:text-slate-50 transition"
                        >
                          Know More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )
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
