import dynamic from "next/dynamic";

const BlogPage = dynamic(
  () =>
    import("@/components/BlogPage", {
      ssr: false,
    }),
);

export default function Blog({ params }) {
  return (
    <main>
      <BlogPage slug={params.slug} />
    </main>
  );
}
