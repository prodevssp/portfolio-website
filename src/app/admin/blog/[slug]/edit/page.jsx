"use client";
import onlyAdmin from "@/lib/onlyAdmin";
import dynamic from "next/dynamic";

const BlogEditor = dynamic(() => import("@/components/BlogEditor"), {
  ssr: false,
});

function BlogEditorPage({ params }) {
  return (
    <main>
      <BlogEditor slug={params.slug} />
    </main>
  );
}

export default onlyAdmin(BlogEditorPage);
