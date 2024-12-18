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
    arrows: true,
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
    <section
      className="py-16 pb-32 dark:bg-[#2C2D33] bg-slate-50 md:px-10"
      id="certificate"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-orange-500">
          {config.certificationsHeading.title}
        </h2>
        <p className="text-2xl text-gray-400 mt-2">
          {config.certificationsHeading.description}
        </p>
      </div>

      
      <div className="mt-12 px-6 max-w-7xl mx-auto">
        <Slider {...settings}>
          {config.certificates.map((certificate, index) => (
            <div key={index} className="px-2 h-full mb-2">
              <div className="h-full dark:bg-[#4B4F5C] hover:scale-105 bg-slate-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300 flex flex-col">
                {/* Image Section */}
                <div className="h-56 w-full">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Text Content Section */}
                <div className="p-4 flex flex-1 flex-col justify-between">
                  <h3 className="text-xl font-bold dark:text-slate-50 text-slate-800">
                    {certificate.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {certificate.description}
                  </p>

                  {/* Button */}
                  <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto mb-4 block text-center px-6 py-2.5 border border-orange-500 text-orange font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-md hover:shadow-lg text-orange-500 hover:text-white"
                  >
                    {config.certificationsHeading.viewCertificate}
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
