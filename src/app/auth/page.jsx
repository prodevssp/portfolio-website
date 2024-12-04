"use client";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
	SignUpButton,
	UserButton,
	useUser,
} from "@clerk/nextjs";

export default function Home() {
	const { user } = useUser();
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<SignedOut>
				<SignUpButton />
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<UserButton />
				<h1>Hey {user?.firstName}</h1>
				<SignOutButton />
			</SignedIn>
		</div>
	);
}
