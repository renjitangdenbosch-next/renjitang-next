/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "renjitang.nl", pathname: "/**" },
      { protocol: "https", hostname: "www.renjitang.nl", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/index.php/book-appointment",
        destination: "/bookings",
        permanent: true,
      },
      {
        source: "/index.php/book-appointment/",
        destination: "/bookings",
        permanent: true,
      },
      {
        source: "/acupuctuur-en-vergoeding-zorgverzekering",
        destination: "/acupunctuur-en-vergoeding-zorgverzekering",
        permanent: true,
      },
      {
        source: "/index.php/acupuctuur-en-vergoeding-zorgverzekering",
        destination: "/acupunctuur-en-vergoeding-zorgverzekering",
        permanent: true,
      },
      {
        source: "/index.php/acupuctuur-en-vergoeding-zorgverzekering/",
        destination: "/acupunctuur-en-vergoeding-zorgverzekering",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
