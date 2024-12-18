import { notFound } from "next/navigation";
import Image from "next/image";
import { CustomMDX } from "../../../components/ui/Mdx";
import formatDate from "../../../lib/formatDate";
import { getBlogPosts } from "../../db/blog";
import Button from "../../../components/ui/Button";

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

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
      <div className="flex flex-col w-full max-w-4xl space-y-8">
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
              width={1200}
              height={630}
              className="rounded-lg max-w-full"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-quoteless prose-neutral dark:prose-invert text-base sm:text-lg md:text-xl text-slate-800 dark:text-gray-400 w-full">
          <CustomMDX source={post.content} />
        </article>

        {/* Navigation Button */}
        <div className="flex justify-center mt-8">
          <Button className="self-center">
            <a href="/blog">Back to Blog</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
