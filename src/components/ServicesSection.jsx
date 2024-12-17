"use client";
import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from "firebase/auth";
import Link from "next/link";
import { auth, googleProvider } from "@/firebase";

const services = [
  {
    title: "Creative Design",
    price: "$99",
    description:
      "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development",
    icon: "/assets/avatar.png",
  },
  {
    title: "Graphic Design",
    price: "$199",
    description:
      "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development",
    icon: "/assets/avatar.png",
  },
  {
    title: "UI/UX Design",
    price: "$299",
    description:
      "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development",
    icon: "/assets/avatar.png",
  },
  {
    title: "Web Design",
    price: "$399",
    description:
      "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development",
    icon: "/assets/avatar.png",
  },
];

const AuthModal = ({ isOpen, onClose, onEmailSignIn, mode, switchMode }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Configuration for email link
      const actionCodeSettings = {
        url: typeof window !== "undefined" ? window.location.origin : "",
        handleCodeInApp: true,
      };

      // Send sign-in link to email
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      // Save email to local storage for verification
      window.localStorage.setItem("emailForSignIn", email);

      // Show sent confirmation
      setEmailSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (error) {
      setError("Error signing in with Google: " + error.message);
    }
  };

  useEffect(() => {
    // Check for email link sign-in on component mount
    if (
      typeof window !== "undefined" &&
      isSignInWithEmailLink(auth, window.location.href)
    ) {
      // Retrieve the email from local storage
      let email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        // Prompt user to provide email if not in local storage
        email = window.prompt("Please provide your email for confirmation");
      }

      // Complete sign-in
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          // Clear the email from local storage
          window.localStorage.removeItem("emailForSignIn");
          onClose();
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#2c2d33] rounded-lg p-8 w-96 relative">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {emailSent ? (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              Sign-in link sent to your email. Check your inbox!
            </p>
            <button
              onClick={() => setEmailSent(false)}
              className="text-orange-500 hover:underline"
            >
              Send again
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-[#4b4f5c] dark:text-white"
                required
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors mb-4"
            >
              {mode === "login" ? "Send Login Link" : "Send Sign Up Link"}
            </button>
          </form>
        )}

        {/* Google Sign-In */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white dark:bg-[#2c2d33] text-gray-500 dark:text-gray-300">
              OR
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-4 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 48 48"
            className="mr-2"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.305c-1.649 4.657-6.08 8-11.305 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.305a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          Sign in with Google
        </button>

        <div className="mt-4 text-center">
          <button
            onClick={switchMode}
            className="text-orange-500 hover:underline"
          >
            {mode === "login"
              ? "Need an account? Sign Up"
              : "Already have an account? Log In"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

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
            What I Do for Clients
          </h3>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#4b4f5c] rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="h-full w-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-50">
                    {service.title}
                  </h4>
                  <p className="text-orange-500 font-medium">
                    Starts from {service.price}
                  </p>
                </div>
              </div>
              <p className="text-gray-500 dark:text-slate-200 mt-4 text-sm">
                {service.description}
              </p>
              {user ? (
                <Link
                  href="/consult"
                  className="mt-6 block text-center px-6 py-2.5 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Book a Call
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setAuthMode("login");
                  }}
                  className="mt-6 block w-full text-center px-6 py-2.5 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Book a Call
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
