/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://www.paypal.com https://challenges.cloudflare.com https://googleads.g.doubleclick.net https://www.googleadservices.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https: https://googleads.g.doubleclick.net https://www.google.com; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://challenges.cloudflare.com https://region1.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.paypal.com https://challenges.cloudflare.com https://www.google.com; media-src 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              'camera=(), microphone=(), geolocation=(), payment=(self "https://www.paypal.com"), usb=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
