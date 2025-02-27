/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["bbafbtqycmgvlyungeqn.supabase.co"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/landingpage-2',
  //       permanent: false,
  //     },
  //   ];
  // },

  async rewrites() {
    return [
      {
        source: '/race/:id',
        destination: '/sound-race/:id',
      },
    ];
  },

  // redirects() {
  //   return ["/"].map((source) => ({
  //     source,
  //     destination: "/sound-race/d5cf2093-d449-444a-aea9-d60073505500",
  //     permanent: false,
  //   }));
  // },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
