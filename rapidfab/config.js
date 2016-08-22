switch(process.env.NODE_ENV) {
  case "production":
    module.exports = {
      SENTRY_DSN        : 'https://5dec153715544b259ba254582e1f9fa2@sentry.authentise.com/24',
      BUREAU            : 'https://erp.authentise.com/bureau/16473d32-54c3-43c3-b635-83c86e009f03/',
      GROUP             : 'https://users.authentise.com/groups/932f1dfc-44c8-43b3-aa40-d0d4e7163707/',
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
      BUREAU            : 'https://erp.dev-auth.com/bureau/3c5e5cf4-0805-4fd8-a17d-3b873cbcedf7/',
      GROUP             : 'https://users.dev-auth.com/groups/9be439f9-b957-4004-9769-ee392c6a70ec/',
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
      BUREAU            : 'https://erp.dev-auth.com/bureau/3c5e5cf4-0805-4fd8-a17d-3b873cbcedf7/',
      GROUP             : 'https://users.dev-auth.com/groups/9be439f9-b957-4004-9769-ee392c6a70ec/',
      HOST              : {
        PAO             : 'https://users.dev-auth.com',
        WYATT           : 'https://erp.dev-auth.com',
        EVENT           : 'https://events.dev-auth.com/',
        HOTH            : 'https://models.dev-auth.com/',
        SCYLLA          : 'https://app.dev-auth.com',
      },
    };
}
