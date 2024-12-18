"use client";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { FiSun, FiMoon } from "react-icons/fi"; // Import theme toggle icons
import { useTheme } from "next-themes";
import Image from "next/image";
import { navLinks } from "@/lib/config";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 py-4 md:py-8 px-10 lg:px-20 fixed w-full z-50">
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-white font-bold text-xl">
            <Image
              src="/assets/soumyaSourav_logo.webp"
              alt="logo"
              width={200}
              height={200}
            />
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-black dark:text-gray-400 hover:text-orange-500 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          {/* Theme Toggle Icon */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-gray-600 dark:text-gray-400 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
        </div>
        <div className="md:hidden flex items-center space-x-4">
          {/* Theme Toggle Icon */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-gray-600 dark:text-gray-400 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
          <button
            className="text-gray-400 hover:text-orange-500 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <IoMdClose size={24} /> : <RxHamburgerMenu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800 py-2">
          <div className="container mx-auto flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                onClick={() => setIsOpen(false)} // Close menu on link click
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
