import { auth, googleProvider } from "@/firebase";
import {
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router

const AuthModal = ({ isOpen, onClose, mode, switchMode }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // Store the current path when the modal opens
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      window.localStorage.setItem("authRedirectPath", window.location.pathname);
    }
  }, [isOpen]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Include the current path in the redirect URL
      const redirectPath =
        window.localStorage.getItem("authRedirectPath") || "/";
      const actionCodeSettings = {
        url: `${window.location.origin}${redirectPath}`,
        handleCodeInApp: true,
      };

      if (mode === "signup") {
        window.localStorage.setItem("nameForSignUp", name);
      }

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setEmailSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const redirectPath =
        window.localStorage.getItem("authRedirectPath") || "/";
      window.localStorage.removeItem("authRedirectPath");
      onClose();
      router.push(redirectPath);
    } catch (error) {
      setError("Error signing in with Google: " + error.message);
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      isSignInWithEmailLink(auth, window.location.href)
    ) {
      let email = window.localStorage.getItem("emailForSignIn");
      let name = window.localStorage.getItem("nameForSignUp");
      const redirectPath =
        window.localStorage.getItem("authRedirectPath") || "/";

      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      if (!name && window.location.href.includes("mode=signup")) {
        name = window.prompt("Please provide your name to complete signup");
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          if (name) {
            return result.user
              .updateProfile({
                displayName: name,
              })
              .then(() => result);
          }
          return result;
        })
        .then(() => {
          // Clean up localStorage
          window.localStorage.removeItem("emailForSignIn");
          window.localStorage.removeItem("nameForSignUp");
          window.localStorage.removeItem("authRedirectPath");

          onClose();
          // Redirect back to the original path
          router.push(redirectPath);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [onClose, router]);

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
            {mode === "signup" && (
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-[#4b4f5c] dark:text-white"
                  required
                  placeholder="Enter your name"
                />
              </div>
            )}
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

export default AuthModal;
