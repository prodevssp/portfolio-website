import Link from "next/link";
import { getBlogPosts } from "../db/blog";
import formatDate from "../../lib/formatDate";
import calculateEstimateReadingTime from "../../lib/calculateEstimateReadingTime";
import Separator from "../../components/ui/Separator";

export default function BlogPage() {
  const blogs = getBlogPosts();

  return (
    <section>
      <h2 className="font-medium text-2xl mb-8 tracking-tight font-['monospace']">
        Writings 🧑🏻‍💻
      </h2>
      {blogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <div key={post.slug} className="mb-8">
            <Link href={`/blog/${post.slug}`} className="block hover:underline">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 transition-all duration-300 ease-in-out">
                &rarr; {post.metadata.title}
              </h3>
            </Link>
            <p className="text-neutral-700 dark:text-neutral-300 text-base mt-1 mb-2">
              {post.metadata.summary}
            </p>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm">
              <span>{formatDate(post.metadata.publishedAt)}</span>
              <span className="mx-2">•</span>
              <span>{calculateEstimateReadingTime(post.content)} read</span>
            </div>
            <Separator />
          </div>
        ))}

      <p className="mt-6 text-neutral-600 dark:text-neutral-400">
        I try to write from time to time about topics that have helped me grow.
      </p>
    </section>
  );
}
