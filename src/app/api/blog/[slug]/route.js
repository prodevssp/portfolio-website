import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { parseFrontmatter } from "@/app/db/blog";

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Read and parse
    const raw = fs.readFileSync(filePath, "utf-8");
    const { metadata, content } = parseFrontmatter(raw);

    // Return the entire blog info
    return NextResponse.json({
      slug,
      metadata,
      content, // or you could omit content if you're only showing an excerpt, etc.
    });
  } catch (error) {
    console.error("Error fetching single blog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
