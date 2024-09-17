// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://e44e2ce601badd83ac35efea8cb29576@o4507556578852864.ingest.us.sentry.io/4507831593271296",

    release: process.env.NEXT_PUBLIC_RELEASE,

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampler: ({name}) => {
      if (name.includes("/health")) {
        return 0;
      }

      if (name.includes("/favicon.ico")) {
        return 0;
      }

      return 0.1;
    },

    profilesSampler({transactionContext: {name}}) {
      if (name.includes("/health")) {
        return 0;
      }

      if (name.includes("/favicon.ico")) {
        return 0;
      }

      return 0.1;
    },

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: process.env.NODE_ENV === 'development',

  });
}