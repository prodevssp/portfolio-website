import { db } from "@/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import mailer from "@/lib/mailer";
import { generateNewsletterTemplate } from "@/lib/emails/newsletter";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const blogsRef = collection(db, "blogs");
    const subscribersRef = collection(db, "subscribers");

    // Fetch new blogs that haven't been notified
    const blogsSnapshot = await getDocs(blogsRef);
    const newBlogs = blogsSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((blog) => !blog.notified);

    if (newBlogs.length === 0) {
      console.log("No new blogs to notify.");
      return NextResponse.json({ message: "No new blogs to notify." });
    }

    // Fetch all subscribers
    const subscribersSnapshot = await getDocs(subscribersRef);
    const subscribers = subscribersSnapshot.docs.map((doc) => doc.data().email);

    // Send an email for each new blog
    for (const blog of newBlogs) {
      for (const email of subscribers) {
        await mailer({
          subject: `New Blog Published: ${blog.title}`,
          // html: `<p>${blog.summary}</p><p><a href="${process.env.NEXT_PUBLIC_APP_URL}/blog/${blog.slug}">Read more</a></p>`,
          html: generateNewsletterTemplate({
            blogTitle: blog.title,
            blogSummary: blog.summary,
            blogUrl: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${blog.slug}`,
          }),
          to: email,
        });
      }

      // Mark blog as notified
      const blogDoc = doc(db, "blogs", blog.id);
      await updateDoc(blogDoc, { notified: true });
      console.log(`Notified subscribers about blog: ${blog.title}`);
    }

    return NextResponse.json({ message: "Cron job executed successfully!" });
  } catch (error) {
    console.error("Error sending newsletter emails:", error);
    return NextResponse.json(
      { error: "Cron job execution failed!" },
      { status: 500 }
    );
  }
};