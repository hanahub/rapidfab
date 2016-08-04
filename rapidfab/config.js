switch(process.env.NODE_ENV) {
  case "production":
    module.exports = {
      SENTRY_DSN        : 'https://5dec153715544b259ba254582e1f9fa2@sentry.authentise.com/24',
      HOST              : {
        PAO             : 'https://users.authentise.com',
        WYATT           : 'https://erp.authentise.com',
        EVENT           : 'https://events.authentise.com/',
        HOTH            : 'https://models.authentise.com/',
        SCYLLA          : 'https://app.authentise.com',
      },
    };
    break;
  case "development":
    module.exports = {
      SENTRY_DSN        : 'https://3d4d1e8404ca40e4abda58d1a090d5b7@sentry.authentise.com/12',
      HOST              : {
        PAO             : 'https://users.dev-auth.com',
        WYATT           : 'https://erp.dev-auth.com',
        EVENT           : 'https://events.dev-auth.com/',
        HOTH            : 'https://models.dev-auth.com/',
        SCYLLA          : 'https://app.dev-auth.com',
      },
    };
    break;
  default:
    module.exports = {
      SENTRY_DSN        : null,
      HOST              : {
        PAO             : 'https://users.dev-auth.com',
        WYATT           : 'https://erp.dev-auth.com',
        EVENT           : 'https://events.dev-auth.com/',
        HOTH            : 'https://models.dev-auth.com/',
        SCYLLA          : 'https://app.dev-auth.com',
      },
    };
}
