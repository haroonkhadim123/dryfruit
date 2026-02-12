/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dyr4xwyhf/**",
       
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/((?!api|products).*)',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
