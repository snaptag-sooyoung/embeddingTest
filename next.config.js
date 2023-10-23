/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "workerserver-dev.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "workerserver-dev.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "labcode-core-dev.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "labcode-core-dev.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
