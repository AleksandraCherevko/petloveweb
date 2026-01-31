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
    ],
  },
};

module.exports = nextConfig;
