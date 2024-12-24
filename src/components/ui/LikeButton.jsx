"use client";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import AuthModal from "../AuthModal";
import { getAuth } from "firebase/auth";
import { Oi } from "next/font/google";

function LikeButton({ slug, initialLikes, likedBy }) {
  const auth = getAuth();
  const currentUser = auth?.currentUser;

  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(
    currentUser ? likedBy?.includes(currentUser.uid) : false,
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const switchAuthMode = () => {
    setAuthMode((mode) => (mode === "login" ? "signup" : "login"));
  };

  const handleLike = async () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/blog/" + slug + "/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, userId: currentUser.uid }),
      });

      if (!response.ok) {
        throw new Error("Failed to update like");
      }

      const data = await response.json();
      setLikes(data.likes);
      setIsLiked(data.isLiked); // Update the `isLiked` state based on the response
    } catch (error) {
      console.error("Error updating like:", error);
      toast.error("Failed to update like");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleLike}
        disabled={isLoading}
        className="flex items-center gap-1 text-sm font-medium group"
      >
        <span
          className={`transition-colors ${
            isLiked ? "text-red-500" : "text-gray-500 dark:text-gray-400"
          } group-hover:text-red-500`}
        >
          {isLiked ? (
            <FaHeart size={20} className="fill-current" />
          ) : (
            <FaRegHeart size={20} />
          )}
        </span>
        <span>{likes}</span>
      </button>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        switchMode={switchAuthMode}
      />
    </div>
  );
}

export default LikeButton;
