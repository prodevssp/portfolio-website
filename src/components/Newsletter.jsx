"use client";
import React, { useState } from "react";
import Button from "./ui/Button";

const DotPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <pattern
      id="dots"
      x="0"
      y="0"
      width="20"
      height="20"
      patternUnits="userSpaceOnUse"
    >
      <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.2)" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <section
      className="py-8 md:py-16 bg-white dark:bg-[#2C2D33] transition-colors duration-300 px-4 md:px-10 flex justify-center"
      id="newsletter"
    >
      <div className="relative w-full max-w-6xl bg-violet-500 bg-opacity-90 rounded-xl p-6 sm:p-8 md:p-16 overflow-hidden">
        <DotPattern />
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:justify-between gap-8">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-white text-base md:text-lg">Subscribe Now</h3>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-normal">
              Get My Newsletter
            </h2>
            <p className="text-white text-base md:text-lg opacity-90 mt-2 max-w-lg">
              Get latest news, updates, tips and trics in your inbox
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full lg:min-w-[460px] lg:w-auto"
          >
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email here"
                className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white text-gray-800 placeholder-gray-400 focus:outline-none w-full"
                required
              />
              <Button
                type="submit"
                className="w-full sm:w-auto rounded-lg sm:rounded-l-none sm:rounded-r-lg"
              >
                Send Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
