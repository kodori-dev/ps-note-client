import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  serverRuntimeConfig: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_SESSION_PW: process.env.NEXT_PUBLIC_SESSION_PW,
    NEXT_PUBLIC_ADMIN_ID1: process.env.NEXT_PUBLIC_ADMIN_ID1,
    NEXT_PUBLIC_ADMIN_ID2: process.env.NEXT_PUBLIC_ADMIN_ID2,
    NEXT_PUBLIC_RELEASE: process.env.NEXT_PUBLIC_RELEASE
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_FRONT_URL: process.env.NEXT_PUBLIC_FRONT_URL,
    NEXT_PUBLIC_SESSION_PW: process.env.NEXT_PUBLIC_SESSION_PW,
    NEXT_PUBLIC_ADMIN_ID1: process.env.NEXT_PUBLIC_ADMIN_ID1,
    NEXT_PUBLIC_ADMIN_ID2: process.env.NEXT_PUBLIC_ADMIN_ID2,
    NEXT_PUBLIC_RELEASE: process.env.NEXT_PUBLIC_RELEASE
  },
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_CDN_URL : undefined,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/proxy/:path*',
        destination: `http://${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: 'kodori',
    project: 'ps-note-client',

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    release: process.env.NEXT_PUBLIC_RELEASE,
  },
  {
    // Upload additional client files (increases upload size)
    widenClientFileUpload: true,

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    authToken: process.env.SENTRY_AUTH_TOKEN,
  }
);
