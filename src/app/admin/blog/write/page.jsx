"use client";
import onlyAdmin from "@/lib/onlyAdmin";
import dynamic from "next/dynamic";

const BlogEditor = dynamic(() => import("@/components/BlogEditor"), {
  ssr: false,
});

function BlogEditorPage() {
  return (
    <main>
      <BlogEditor />
    </main>
  );
}

export default onlyAdmin(BlogEditorPage);
