const path = require('path');
let serverUrl;

if (
  process.env.NODE_ENV === 'development' &&
  process.env.DOCKER_ENV &&
  process.env.DOCKER_ENV === 'true'
) {
  console.log('DOCKER+DEVELOPMENT');
  serverUrl = 'server:5000';
} else if (process.env.NODE_ENV === 'development') {
  console.log('DEVELOPMENT');
  serverUrl = 'localhost:5000';
} else {
  console.log('ELSE');
  serverUrl = 'api.audioarchive.benchavez.xyz';
}
// serverUrl = 'api.audioarchive.benchavez.xyz';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
  poweredByHeader: false,
  transpilePackages: ['ui', 'parameter-store'],
  output: 'standalone',
  // experimental: {
  //   outputFileTracingRoot: path.join(__dirname, '../../'),
  // },
  // https://nextjs.org/docs/app/api-reference/next-config-js/output
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'audio-archive-initial-dev-setup.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'audio-archive-initial-dev-setup.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
      {
        source: '/api/:path*',
        destination: `http://${serverUrl}/api/:path*`,
      },
    ];
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
