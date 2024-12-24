// app/api/blog/like/route.js
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { buildFrontmatter, parseFrontmatter } from "@/app/db/blog";

export async function POST(request) {
  try {
    const { slug } = await request.json();
    if (!slug) {
      return NextResponse.json({ error: "No slug provided" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Read the file
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { metadata, content } = parseFrontmatter(rawContent);

    // Increment the likes
    const currentLikes = parseInt(metadata.likes || "0", 10);
    const newLikes = currentLikes + 1;
    metadata.likes = newLikes;

    // Rebuild
    const newFrontmatter = buildFrontmatter(metadata);
    const newFileContent = newFrontmatter + "\n" + content;

    // Write
    fs.writeFileSync(filePath, newFileContent, "utf-8");

    // Return the updated likes
    return NextResponse.json({ slug, likes: newLikes }, { status: 200 });
  } catch (error) {
    console.error("Error incrementing likes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
