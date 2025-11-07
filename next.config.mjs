/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "tandem-git-dev-matheus-demeis-projects-4bff4ed5.vercel.app",
      },
    ],
  },
};

export default nextConfig;
