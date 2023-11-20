const path = require('path');
let serverUrl = 'http://<SERVER_ALB_URL>'; // | http://server:5000;

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
        // destination: 'http://localhost:5000/api/:path*',
        // destination: 'http://server:5000/api/:path*',
        // destination: `${serverUrl}/api/:path*`,
        destination:
          'http://alb-developmentenv-ser-464535678.us-east-2.elb.amazonaws.com/api/:path',
      },
    ];
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
