const path = require('path');
let serverUrl;

// if (
//   process.env.NODE_ENV === 'development' &&
//   process.env.DOCKER_ENV &&
//   process.env.DOCKER_ENV === 'true'
// ) {
//   console.log('DOCKER+DEVELOPMENT');
//   serverUrl = 'server:5000';
// } else if (process.env.NODE_ENV === 'development') {
//   console.log('DEVELOPMENT');
//   serverUrl = 'localhost:5000';
// } else {
//   console.log('ELSE');
//   serverUrl = 'api.audioarchive.benchavez.xyz';
// }
serverUrl = 'api.audioarchive.benchavez.xyz';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['ui'],
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
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
