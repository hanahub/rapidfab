switch(process.env.NODE_ENV) {
  case "production":
    module.exports = {
      EVENT_HOST        : 'https://events.authentise.com/',
      PAO_HOST          : 'https://users.authentise.com',
      SENTRY_DSN        : 'https://5dec153715544b259ba254582e1f9fa2@sentry.authentise.com/24',
    };
    break;
  case "development":
    module.exports = {
      EVENT_HOST        : 'https://events.dev-auth.com/',
      PAO_HOST          : 'https://users.dev-auth.com',
      SENTRY_DSN        : 'https://3d4d1e8404ca40e4abda58d1a090d5b7@sentry.authentise.com/12',
    };
    break;
  default:
    module.exports = {
      EVENT_HOST        : 'https://events.dev-auth.com/',
      PAO_HOST          : 'https://users.dev-auth.com',
      SENTRY_DSN        : null,
    };
}
