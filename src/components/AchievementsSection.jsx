"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import config from "../lib/config";

const AchievementsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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

  return (
    <section
      className="py-16 pb-32 dark:bg-[#2C2D33] bg-slate-50 md:px-10"
      id="achievements"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-orange-500">Achievements</h2>
        <p className="text-2xl text-gray-400 mt-2">Recognition & Awards</p>
      </div>

      <div className="mt-12 px-6 max-w-7xl mx-auto">
        <Slider {...settings}>
          {config.achievements.map((achievement, index) => (
            <div key={index} className="px-2 h-full mb-2">
              <div className="h-full dark:bg-[#4B4F5C] hover:scale-105 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex flex-col items-center justify-center h-full">
                  <span
                    className="text-4xl mb-4"
                    role="img"
                    aria-label="achievement icon"
                  >
                    {achievement.icon}
                  </span>
                  <h3 className="text-xl font-bold dark:text-slate-50 text-slate-800 text-center mb-4">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-400 text-base text-center">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default AchievementsSection;
