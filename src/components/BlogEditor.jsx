"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { CustomMDX } from "@/components/ui/Mdx";
import { blogsCategories } from "@/lib/config";
import { toast } from "react-toastify";
import Button from "./ui/Button";

export default function BlogEditor() {
  const [isLoading, setIsLoading] = useState(false);
  const [blogPost, setBlogPost] = useState({
    title: "",
    summary: "",
    publishedAt: "",
    category: "",
    status: "draft",
    keywords: [],
    content: `
# Welcome to My Blog

This is an example of how to use code blocks in your MDX content.

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

Enjoy writing your blog posts!
`,
    coverImage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeywordsChange = (e) => {
    const { value } = e.target;
    setBlogPost((prev) => ({
      ...prev,
      keywords: value.split(",").map((keyword) => keyword.trim()),
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure title is provided before submission
    if (!blogPost.title) {
      toast.error("Title is required to save the blog post.");
      return;
    }

    setIsLoading(true);

    const slug = generateSlug(blogPost.title);
    const postData = { ...blogPost, slug };

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        toast.success("Blog post saved successfully!");
        setBlogPost({
          title: "",
          summary: "",
          publishedAt: "",
          category: "",
          status: "draft",
          content: "",
          coverImage: "",
          keywords: [],
        });
      } else {
        const errorData = await response.json();
        toast.error(`Failed to save blog post: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-[#2C2D33] flex items-center justify-center px-4 py-12 md:px-10">
      <div className="flex flex-col w-full max-w-6xl space-y-8 mt-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-orange-500 mb-4">
          Blog Editor
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={blogPost.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label
                  htmlFor="summary"
                  className="block text-sm font-medium mb-1"
                >
                  Summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={blogPost.summary}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter blog summary"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  rows="3"
                />
              </div>
              <div>
                <label
                  htmlFor="publishedAt"
                  className="block text-sm font-medium mb-1"
                >
                  Publish Date
                </label>
                <input
                  id="publishedAt"
                  name="publishedAt"
                  type="date"
                  value={blogPost.publishedAt}
                  required
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={blogPost.category}
                  onChange={handleInputChange}
                  className="w-full px-3 h-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 appearance-none"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {blogsCategories.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 top-6 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label
                  htmlFor="coverImage"
                  className="block text-sm font-medium mb-1"
                >
                  Cover Image
                </label>
                <input
                  id="coverImage"
                  name="coverImage"
                  type="text"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="URL of cover image"
                />
              </div>

              <div>
                <label
                  htmlFor="keywords"
                  className="block text-sm font-medium mb-1"
                >
                  Keywords
                </label>
                <input
                  id="keywords"
                  name="keywords"
                  type="text"
                  required
                  onChange={handleKeywordsChange}
                  placeholder="Enter keywords separated by commas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={blogPost.status}
                  required
                  onChange={handleInputChange}
                  className="w-full px-3 h-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 appearance-none"
                >
                  <option value="draft">Draft</option>

                  <option value="unpublished">Un published</option>
                  <option value="published">Published</option>
                </select>
                <div className="absolute inset-y-0 right-3 top-6 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-7">
              <label
                htmlFor="content"
                className="block text-sm font-medium mb-1"
              >
                Content (MDX)
              </label>
              <textarea
                id="content"
                name="content"
                value={blogPost.content}
                onChange={handleInputChange}
                placeholder="Write your blog post in MDX format"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 h-full"
              />
            </div>
          </div>
          <Button
            type="submit"
            className={"w-full"}
            // className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {isLoading ? "Saving..." : "Save Blog Post"}
          </Button>
        </form>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Preview</h2>
            <div className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                {blogPost.title}
              </h1>
              {blogPost.coverImage && (
                <Image
                  src={blogPost.coverImage}
                  alt={blogPost.title}
                  width={800}
                  height={400}
                  className="rounded-lg max-w-full"
                />
              )}
              <Suspense fallback={<div>Loading preview...</div>}>
                <CustomMDX source={blogPost.content} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
