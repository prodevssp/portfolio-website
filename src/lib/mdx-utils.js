import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/components/ui/Mdx";

export async function renderMDX(source) {
  return <MDXRemote source={source} components={components} />;
}
