// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://e44e2ce601badd83ac35efea8cb29576@o4507556578852864.ingest.us.sentry.io/4507831593271296",

    release: process.env.RELEASE,

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
  });
}