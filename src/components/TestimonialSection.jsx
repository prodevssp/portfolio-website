"use client";
import React, { useEffect, useState } from "react";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      text: "I rarely like to write reviews, but the Marketify team truly deserve a standing ovation for their customer support, customization, and most importantly, friendliness and professionalism. Many thanks once again for everything and hope that I get to deal with you again in the near future.",
      author: "Mike Anderson",
      position: "Vivaco Studio",
      avatar: "/assets/avatar.png",
    },
    {
      id: 2,
      text: "Excellent service and amazing designs! They went above and beyond to ensure everything was perfect. I am truly impressed with the quality and dedication.",
      author: "Sarah Johnson",
      position: "Creative Minds",
      avatar: "/assets/avatar.png",
    },
    {
      id: 3,
      text: "Their attention to detail and commitment to delivering top-notch results make them stand out from the rest. Highly recommended!",
      author: "Alex Brown",
      position: "DesignHub",
      avatar: "/assets/avatar.png",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [activeIndex]);

  return (
    <section className="relative py-16 bg-white text-center dark:bg-[#2C2D33]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-orange-500 text-lg font-semibold">Testimonials</h2>
        <h3 className="text-4xl font-bold mt-2 dark:text-slate-50">
          What My Clients Say
        </h3>
        <p className="text-gray-500 text-lg mt-4 dark:text-slate-50">
          Most common methods for designing websites that work well on desktop
          is responsive and adaptive design.
        </p>

        {/* Testimonial Content */}
        <div className="mt-12">
          <div className="mx-auto max-w-3xl">
            <div className="text-5xl text-orange-500">
              <span>&ldquo;</span>
            </div>
            <p className="text-gray-700 dark:text-slate-50 text-xl mt-4 leading-relaxed">
              {testimonials[activeIndex].text}
            </p>
            <div className="flex items-center justify-center mt-6">
              <img
                src={testimonials[activeIndex].avatar}
                alt={testimonials[activeIndex].author}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-slate-50">
                  {testimonials[activeIndex].author}
                </p>
                <p className="text-gray-500 text-sm dark:text-slate-50">
                  {testimonials[activeIndex].position}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                activeIndex === index
                  ? "bg-orange-500"
                  : "bg-gray-300 hover:bg-orange-500"
              }`}
            ></button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center max-w-4xl mx-auto mt-8">
          <button
            onClick={handlePrev}
            className="text-gray-500 hover:text-orange-500"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="text-gray-500 hover:text-orange-500"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
