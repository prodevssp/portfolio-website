import CategoryClient from "@/components/BlogCategoryPage";
import { blogsCategories } from "@/lib/config";

export async function generateMetadata({ params }) {
  const decodedCategory = decodeURIComponent(
    params.category || blogsCategories[0],
  );
  return {
    title: `${decodedCategory} Blogs`,
    description: `Explore all the latest posts on ${decodedCategory}.`,
    // Optionally add openGraph, twitter, etc.
  };
}

export default function CategoryServerPage({ params }) {
  const decodedCategory = decodeURIComponent(
    params.category || blogsCategories[0],
  );

  // We simply pass the "decodedCategory" to a client component
  return <CategoryClient category={decodedCategory} />;
}
