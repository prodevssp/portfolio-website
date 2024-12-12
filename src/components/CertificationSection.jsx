"use client";
import React from "react";
import Slider from "react-slick";
import config from "@/lib/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CertificationSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
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
        {/* Styles are overwritten in globals.css */}
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
  };

  return (
    <section className="py-16 pb-32 dark:bg-[#2C2D33] bg-slate-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-orange-500">Certification</h2>
        <p className="text-2xl text-gray-400 mt-2">My Amazing Works</p>
      </div>

      {/* Added max-width and centered the slider container */}
      <div className="mt-12 px-6 max-w-7xl mx-auto">
        <Slider {...settings}>
          {config.certificates.map((certificate, index) => (
            <div key={index} className="px-2 h-full mb-2">
              <div className="h-full dark:bg-[#4B4F5C] hover:scale-105 bg-slate-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="h-56 object-cover w-full"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold dark:text-slate-50 text-slate-800">
                    {certificate.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {certificate.description}
                  </p>
                  <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 text-sm font-semibold text-orange-500 border border-orange-500 rounded hover:bg-orange-500 hover:text-slate-50 transition"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CertificationSection;
