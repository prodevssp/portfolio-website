"use client";

import formatDate from "@/lib/formatDate";

const { default: Image } = require("next/image");
const { CustomMDX } = require("./ui/Mdx");
const { default: ScrollToTopButton } = require("./ui/ScrollToTop");
const { useEffect } = require("react");
const { useState } = require("react");
const { notFound } = require("next/navigation");

async function fetchBlogPost(slug) {
  try {
    // Fetch the blog post data from the API
    const response = await fetch(`/api/blog/${slug}`);

    if (!response.ok) {
      throw new Error("Failed to fetch blog post");
    }

    const data = await response.json();

    // Return the blog post data
    return data;
  } catch (err) {
    console.error("Error fetching blog post:", err);
    return err;
  }
}

export default function BlogPage({ slug }) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogPost(slug)
      .then((data) => setPost(data))
      .catch(() => notFound())
      .finally(() => setIsLoading(false));
  }, [slug]);

  // const moreLikeThis = allPosts
  //   .filter(
  //     (p) =>
  //       p.category?.toLowerCase() === post.category?.toLowerCase() &&
  //       p.slug !== post.slug,
  //   )
  //   .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  //   .slice(0, 3);

  const getGridClassName = (cardCount) => {
    const baseClasses = "grid gap-8 justify-items-center";
    if (cardCount === 1) {
      return `${baseClasses} grid-cols-1 max-w-md mx-auto`;
    } else if (cardCount === 2) {
      return `${baseClasses} grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto`;
    }
    return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
  };

  if (isLoading) {
    return (
      <section
        className="min-h-screen text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-[#2C2D33] flex items-center justify-center px-4 py-12 md:px-10"
        id="blog-post"
      >
        <p className="text-2xl font-semibold text-center">Loading...</p>
      </section>
    );
  }

  console.log(post);

  return (
    <section
      className="min-h-screen text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-[#2C2D33] flex items-center justify-center px-4 py-12 md:px-10"
      id="blog-post"
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            description: post.summary,
            image: post.ogImage ? `${post.ogImage}` : `${post.coverImage}`,
            url: `https://ayushchugh.com/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Soumya Saourav",
            },
          }),
        }}
      />

      <div className="flex flex-col w-full max-w-6xl space-y-8 mt-20">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-orange-500 text-xl font-semibold mb-4">
            Blog Post
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            {post.title}
          </h1>
          <div className="flex justify-center items-center text-slate-600 dark:text-slate-400">
            <p className="text-sm">{formatDate(post.publishedAt)}</p>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="w-full flex justify-center">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-lg max-w-full"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-quoteless prose-neutral dark:prose-invert text-base sm:text-lg md:text-xl text-slate-800 dark:text-gray-400 w-full">
          <CustomMDX source={JSON.parse(post.content)} />
        </article>

        {/* "More like this" Section with dynamic grid layout */}
        {/* {moreLikeThis.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center text-orange-500">
              More Like This
            </h3>
            <div className={getGridClassName(moreLikeThis.length)}>
              {moreLikeThis.map((item) => (
                <BlogCard key={item.slug} blog={item} />
              ))}
            </div>
          </div>
        )} */}

        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </div>
    </section>
  );
}
