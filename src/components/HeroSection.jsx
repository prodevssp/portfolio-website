import config from "@/lib/config";
import Image from "next/image";
import Button from "./ui/Button";
import MouseScrollAnimation from "./ui/MouseScrollAnimation";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center bg-[url('/assets/backgrounds/hero-bg.jpg')] dark:bg-[url('/assets/backgrounds/hero-bg-dark.jpg')] px-4">
      <div className="max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start space-y-4 text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl text-orange-500 font-semibold">
            Hello, I&apos;m
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-slate-900 dark:text-white">
            {config.basicDetails.name}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-300">
            A <span className="text-green-600">{config.basicDetails.role}</span>{" "}
            From{" "}
            <span className="text-blue-600">
              {config.basicDetails.location}
            </span>
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-300 max-w-md">
            {config.basicDetails.about}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
            <Button>About me</Button>
            <div className="flex gap-3 mt-2 sm:mt-0">
              <a
                href={config.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn
                  size={25}
                  className="dark:fill-white hover:text-blue-500 transition-colors"
                />
              </a>
              <a
                href={config.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub
                  size={25}
                  className="dark:fill-white hover:text-gray-700 transition-colors"
                />
              </a>
              <a
                href={`mailto:${config.socials.mail}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoMdMail
                  size={25}
                  className="dark:fill-white hover:text-red-500 transition-colors"
                />
              </a>
            </div>
          </div>
        </div>
        {/* Image */}
        <div className="mb-8 lg:mb-0">
          <Image
            src={"/assets/avatar.svg"}
            alt="avatar"
            width={400}
            height={400}
            className="w-48 sm:w-64 md:w-80 lg:w-full max-w-sm"
          />
        </div>
      </div>
      <MouseScrollAnimation />
    </section>
  );
}
