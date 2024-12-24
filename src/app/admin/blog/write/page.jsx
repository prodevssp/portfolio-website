import dynamic from "next/dynamic";

const BlogEditor = dynamic(() => import("@/components/BlogEditor"), {
  ssr: false,
});

export default function BlogEditorPage() {
  return (
    <main>
      <BlogEditor />
    </main>
  );
}
