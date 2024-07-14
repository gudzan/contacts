import * as Sentry from "@sentry/react";

function init() {
    Sentry.init({
        dsn: "https://cc5b1e0d93a6549223dd7153fdb1c6e1@o4507599525904384.ingest.de.sentry.io/4507599556509776",
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration(),
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
        // Session Replay
        replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    }); 
}

function log(error) {
    Sentry.captureException(error);
}

const logger = {
    init,
    log,
};

export default logger;
