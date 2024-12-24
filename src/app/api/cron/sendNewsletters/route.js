export const GET = async () => {
  try {
    const blogsRef = collection(db, "blogs");
    const subscribersRef = collection(db, "subscribers");

    // Fetch new blogs that haven't been notified and are published
    const blogsSnapshot = await getDocs(blogsRef);
    const newBlogs = blogsSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((blog) => blog.status === "published" && !blog.notified); // Filter by published status

    if (newBlogs.length === 0) {
      console.log("No new blogs to notify.");
      return NextResponse.json({ message: "No new blogs to notify." });
    }

    // Fetch active subscribers
    const subscribersSnapshot = await getDocs(subscribersRef);
    const subscribers = subscribersSnapshot.docs
      .map((doc) => doc.data())
      .filter((subscriber) => subscriber.subscribed) // Only send to subscribed users
      .map((subscriber) => subscriber.email);

    if (subscribers.length === 0) {
      console.log("No active subscribers.");
      return NextResponse.json({ message: "No active subscribers." });
    }

    // Send an email for each new blog
    for (const blog of newBlogs) {
      for (const email of subscribers) {
        await mailer({
          subject: `New Blog Published: ${blog.title}`,
          html: generateNewsletterTemplate({
            blogTitle: blog.title,
            blogSummary: blog.summary,
            blogUrl: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${blog.slug}`,
            unsubscribeUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/${email}/unsubscribe`,
          }),
          to: email,
        });
      }

      // Mark blog as notified
      const blogDoc = doc(db, "blogs", blog.id);
      await updateDoc(blogDoc, { notified: true });
      console.log(`Notified subscribers about blog: ${blog.title}`);
    }

    return NextResponse.json({ message: "Newsletters sent successfully!" });
  } catch (error) {
    console.error("Error sending newsletter emails:", error);
    return NextResponse.json(
      { error: "Newsletter sending failed!" },
      { status: 500 },
    );
  }
};
