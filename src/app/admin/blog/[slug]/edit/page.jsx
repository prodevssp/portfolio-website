import dynamic from "next/dynamic";

const BlogEditor = dynamic(() => import("@/components/BlogEditor"), {
  ssr: false,
});

export default function BlogEditorPage({ params }) {
  return (
    <main>
      <BlogEditor slug={params.slug} />
    </main>
  );
}
