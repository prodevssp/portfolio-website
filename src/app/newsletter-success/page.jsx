import Button from "@/components/ui/Button";
import Link from "next/link";

export default function NewsletterSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#2C2D33]">
      <div className="max-w-md w-full p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Subscription Confirmed!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for subscribing to our newsletter. You&apos;ll now receive
          our latest updates directly in your inbox.
        </p>
        <Button>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
