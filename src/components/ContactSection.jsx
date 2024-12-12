import React from "react";
import Button from "./ui/Button";

const ContactSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-[#2C2D33] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-orange-500 text-lg font-semibold">Contact Me</h2>
          <h3 className="text-4xl font-bold mt-2 dark:text-slate-50">
            I Want To Hear From You
          </h3>
          <p className="text-gray-500 text-lg mt-4 dark:text-slate-300">
            Please fill out the form in this section to contact me. Or call
            between 9:00 a.m. and 8:00 p.m. ET, Monday through Friday.
          </p>
        </div>

        {/* Content */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-100 dark:bg-orange-800 rounded-full transition-colors duration-300">
                <span className="text-orange-500 dark:text-orange-300 text-xl">
                  📍
                </span>
              </div>
              <div>
                <p className="text-xl font-bold dark:text-slate-50">Address</p>
                <p className="text-gray-500 dark:text-slate-300">
                  20, Somewhere in world
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-800 rounded-full transition-colors duration-300">
                <span className="text-green-500 dark:text-green-300 text-xl">
                  ✉️
                </span>
              </div>
              <div>
                <p className="text-xl font-bold dark:text-slate-50">Email</p>
                <p className="text-gray-500 dark:text-slate-300">
                  hello@dizme.com
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-800 rounded-full transition-colors duration-300">
                <span className="text-purple-500 dark:text-purple-300 text-xl">
                  📞
                </span>
              </div>
              <div>
                <p className="text-xl font-bold dark:text-slate-50">Phone</p>
                <p className="text-gray-500 dark:text-slate-300">
                  +123 456 7890
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 dark:bg-[#4B4F5C] rounded-lg p-8 shadow-md transition-colors duration-300">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3B3F4C] rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3B3F4C] rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Your Phone"
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3B3F4C] rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3B3F4C] rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <textarea
                rows="4"
                placeholder="Write your message here"
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#3B3F4C] rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 w-full mt-6 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500"
              ></textarea>

              <Button sx={"w-full duration-300 mt-4"}>Submit Now</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
