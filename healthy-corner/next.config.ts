import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enables static export
  // basePath removed for custom domain: healthycornermauritanie.me
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mfoxjglvjacermonehcf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
