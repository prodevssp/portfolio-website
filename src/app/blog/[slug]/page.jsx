import { notFound } from "next/navigation";
import Image from "next/image";
import { CustomMDX } from "../../../components/ui/Mdx";
import formatDate from "../../../lib/formatDate";
import { getBlogPosts } from "../../db/blog";
import BlogCard from "../../../components/ui/BlogCard";
import ScrollToTopButton from "@/components/ui/ScrollToTop";

export default function Blog({ params }) {
  const allPosts = getBlogPosts();
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const moreLikeThis = allPosts
    .filter(
      (p) =>
        p.metadata.category?.toLowerCase() ===
          post.metadata.category?.toLowerCase() && p.slug !== post.slug,
    )
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt) - new Date(a.metadata.publishedAt),
    )
    .slice(0, 3);

  const getGridClassName = (cardCount) => {
    const baseClasses = "grid gap-8 justify-items-center";

    if (cardCount === 1) {
      return `${baseClasses} grid-cols-1 max-w-md mx-auto`;
    } else if (cardCount === 2) {
      return `${baseClasses} grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto`;
    }
    return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
  };

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
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.ogImage
              ? `${post.metadata.ogImage}`
              : `${post.metadata.coverImage}`,
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
            {post.metadata.title}
          </h1>
          <div className="flex justify-center items-center text-slate-600 dark:text-slate-400">
            <p className="text-sm">{formatDate(post.metadata.publishedAt)}</p>
          </div>
        </div>

        {/* Cover Image */}
        {post.metadata.coverImage && (
          <div className="w-full flex justify-center">
            <Image
              src={post.metadata.coverImage}
              alt={post.metadata.title}
              width={800}
              height={400}
              className="rounded-lg max-w-full"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-quoteless prose-neutral dark:prose-invert text-base sm:text-lg md:text-xl text-slate-800 dark:text-gray-400 w-full">
          <CustomMDX source={post.content} />
        </article>

        {/* "More like this" Section with dynamic grid layout */}
        {moreLikeThis.length > 0 && (
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
        )}

        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </div>
    </section>
  );
}
