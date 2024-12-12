import config from "@/lib/config";
import React from "react";
import Button from "./ui/Button";

const AboutMe = () => {
  return (
    <section className="h-screen text-slate-50 bg-slate-50 dark:bg-[#2C2D33] flex items-center justify-center px-8">
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-12 w-full max-w-6xl">
        {/* Left Content with Image and Stats */}
        <div className="relative w-full lg:w-1/2 flex items-center justify-center">
          {/* Background Image */}
          {/* <div
						className='w-96 h-96 bg-center bg-cover rounded-full'
						style={{
							backgroundImage:
								"url('/assets/brushes/1.png')",
							clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)',
						}}
					></div> */}

          {/* Stats */}
          <div className="absolute top-10 left-10 bg-gray-800 px-4 py-2 rounded-lg text-center">
            <p className="text-3xl font-bold text-green-400">18</p>
            <p className="text-sm">Years of Success</p>
          </div>
          <div className="absolute bottom-10 right-10 bg-gray-800 px-4 py-2 rounded-lg text-center">
            <p className="text-3xl font-bold text-purple-400">9K</p>
            <p className="text-sm">Total Projects</p>
          </div>
        </div>

        {/* Right Content with Text */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          <h2 className="text-orange-500 lg:text-lg xl:text-xl font-semibold">
            {config.about.heading}
          </h2>
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-slate-50">
            {config.about.subHeading}
          </h1>
          <p className="text-slate-800 dark:text-gray-400 lg:text-lg xl:text-xl">
            {config.about.paragraph}
          </p>

          <Button>{config.about.cta}</Button>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
