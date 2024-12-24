import dynamic from "next/dynamic";

const BlogPage = dynamic(
  () =>
    import("@/components/BlogPage", {
      ssr: false,
    }),
);

// export async function generateMetadata({ params }) {
//   const allPosts = getBlogPosts();
//   const post = allPosts.find((p) => p.slug === params.slug);

//   // If post not found, we might want to return generic or 404 metadata
//   if (!post) {
//     return {
//       title: "Post Not Found",
//       description: "This blog post could not be found.",
//     };
//   }

//   // Construct metadata from the post
//   const { title, summary, coverImage, ogImage } = post.metadata;
//   const coverOrOg = ogImage || coverImage;
//   const pageUrl = `https://soumyasourav.com/blog/${params.slug}`;

//   return {
//     // Basic
//     title: title,
//     description: summary,

//     // Open Graph
//     openGraph: {
//       title: title,
//       description: summary,
//       url: pageUrl,
//       images: [
//         {
//           url: coverOrOg,
//           alt: title,
//         },
//       ],
//     },

//     // Twitter
//     twitter: {
//       card: "summary_large_image",
//       title: title,
//       description: summary,
//       images: [coverOrOg],
//     },
//   };
// }

export default function Blog({ params }) {
  return (
    <main>
      <BlogPage slug={params.slug} />
    </main>
  );
}
