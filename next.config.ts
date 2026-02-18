/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media4.giphy.com",
      },
      {
        protocol: "https",
        hostname: "www.nytimes.com",
      },
      {
        protocol: "https",
        hostname: "ftp.goit.study",
      },
      {
        protocol: "https",
        hostname: "test.png",
      },
      {
        protocol: "https",
        hostname: "cloudinary-marketing-res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
