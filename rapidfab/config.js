switch(process.env.NODE_ENV) {
  case "production":
    module.exports = {
      SENTRY_DSN        : 'https://be5ff4104d554639a517893b12aaafee@sentry.authentise.com/44',
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
      SENTRY_DSN        : 'https://87bc571ec2fe49f5ad8218d09f03b135@sentry.authentise.com/43',
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
