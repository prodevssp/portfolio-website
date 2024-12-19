"use client";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { auth } from "@/firebase";
import AuthModal from "./AuthModal";
import config from "@/lib/config";

const ServicesSection = () => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const switchAuthMode = () => {
    setAuthMode((mode) => (mode === "login" ? "signup" : "login"));
  };

  return (
    <>
      <section
        className="py-16 bg-slate-50 dark:bg-[#2c2d33] dark:text-slate-50 md:px-10"
        id="service"
      >
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-orange-500 text-4xl font-semibold">Services</h2>
          <h3 className="text-2xl text-gray-400 font-bold mt-2">
            {config.servicesHeading.description}
          </h3>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          {config.services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#4b4f5c] rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="flex items-center space-x-4">
                {/* <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="h-full w-full object-contain rounded-full"
                  />
                </div> */}
                <span
                  className="text-4xl mb-4"
                  role="img"
                  aria-label="achievement icon"
                >
                  {service.icon}
                </span>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-50">
                    {service.title}
                  </h4>
                  {service.price && (
                    <p className="text-orange-500 font-medium">
                      Starts from {service.price}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-gray-500 dark:text-slate-200 mt-4 text-sm text-justify">
                {service.description}
              </p>
              {user ? (
                <Link
                  href="/consult"
                  className="mt-6 block text-center px-6 py-2.5 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  {config.servicesHeading.cta}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setAuthMode("login");
                  }}
                  className="mt-6 block w-full text-center px-6 py-2.5 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  {config.servicesHeading.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        switchMode={switchAuthMode}
      />
    </>
  );
};

export default ServicesSection;
