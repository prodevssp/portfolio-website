import config from "@/lib/config";
import Image from "next/image";
import Button from "./ui/Button";
import MouseScrollAnimation from "./ui/MouseScrollAnimation";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function HeroSection() {
	return (
		<section className="h-screen w-full flex items-center justify-center bg-[url('/assets/backgrounds/hero-bg.jpg')]">
			<div className="max-w-7xl flex items-center justify-between">
				<div className="flex flex-col items-start space-y-4">
					<h2 className="text-2xl text-primary-500 font-semibold">
						Hello, I&apos;m
					</h2>
					<h1 className="text-6xl font-medium text-black">
						{config.basicDetails.name}
					</h1>
					<p className="text-lg text-gray-500">
						A <span className="text-green-600">{config.basicDetails.role}</span>{" "}
						From{" "}
						<span className="text-blue-600">
							{config.basicDetails.location}
						</span>
					</p>
					<p className="text-gray-500 max-w-md">{config.basicDetails.about}</p>
					<div className="flex gap-4 items-center mt-6">
						<Button>About me</Button>
						<div className="flex gap-2 items-center">
							<div>
								<a href={config.socials.linkedin} target="_blank">
									<FaLinkedinIn size={20} />
								</a>
							</div>
							<div>
								<a href={config.socials.github} target="_blank">
									<FaGithub size={20} />
								</a>
							</div>
							<div>
								<a href={config.socials.mail} target="_blank">
									<IoMdMail size={20} />
								</a>
							</div>
						</div>
					</div>
				</div>
				<div>
					<Image
						src={"/assets/avatar.svg"}
						alt="avatar"
						width={400}
						height={400}
					/>
				</div>
			</div>
			<MouseScrollAnimation />
		</section>
	);
}
