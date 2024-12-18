/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.ayushchugh.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
