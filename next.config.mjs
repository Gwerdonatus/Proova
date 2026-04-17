/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/terms",
        destination: "/trust#terms",
        permanent: false,
      },
      {
        source: "/privacy",
        destination: "/trust#privacy-policy",
        permanent: false,
      },
      {
        source: "/refunds",
        destination: "/trust#refund-policy",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;