/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: "/en",
        has: [{ type: "host", value: "www.komneuf.com" }],
        destination: "https://www.komneuf.ma/en",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
