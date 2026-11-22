import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'firebase/auth', 'firebase/firestore'],
  },
  output: 'standalone',
  async redirects() {
    return [
      { source: '/roadmap/:id', destination: '/plan/:id', permanent: true },
      { source: '/rhetoric', destination: '/goals?c=rhetoric', permanent: true },
      { source: '/certifications', destination: '/goals?c=academic', permanent: true },
      { source: '/dashboard', destination: '/today', permanent: true },
    ];
  },
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
