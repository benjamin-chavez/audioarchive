const path = require('path');
let serverUrl;

if (process.env.NODE_ENV === 'development') {
  console.log('DEVELOPMENT');
  serverUrl = 'localhost:5000';
  // serverUrl = 'server:5000';
} else {
  console.log('ELSE');
  serverUrl = '<SERVER_ALB_URL>';
}
// let serverUrl =
//   process.env.NODE_ENV === 'development' ? 'server:5000' : '<SERVER_ALB_URL>';

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
        // destination: 'http://server:5000/api/:path*',
        destination: `http://${serverUrl}/api/:path*`,

        // destination:
        //   'http://alb-developmentenv-ser-151200939.us-east-2.elb.amazonaws.com/api/:path*',
      },
    ];
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
