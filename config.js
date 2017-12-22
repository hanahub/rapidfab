switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = {
      SENTRY_DSN:
        'https://be5ff4104d554639a517893b12aaafee@sentry.authentise.com/44',
      HOST: {
        PAO: 'https://users.authentise.com',
        WYATT: 'https://erp.authentise.com',
        EVENT: 'https://events.authentise.com/',
        HOTH: 'https://models.authentise.com/',
        SCYLLA: 'https://app.authentise.com',
        NAUTILUS: 'https://data.authentise.com',
      },
      TOS_URL: 'https://authentise.com/tech/etos.html',
    };
    break;
  case 'development':
    module.exports = {
      SENTRY_DSN:
        'https://87bc571ec2fe49f5ad8218d09f03b135@sentry.authentise.com/43',
      HOST: {
        PAO: 'https://users.dev-auth.com',
        WYATT: 'https://erp.dev-auth.com',
        EVENT: 'https://events.dev-auth.com/',
        HOTH: 'https://models.dev-auth.com/',
        SCYLLA: 'https://app.dev-auth.com',
        NAUTILUS: 'https://data.dev-auth.com',
      },
      TOS_URL: 'https://authentise.com/tech/etos.html',
    };
    break;
  default:
    module.exports = {
      SENTRY_DSN: null,
      HOST: {
        PAO: 'https://users.dev-auth.com',
        WYATT: 'https://erp.dev-auth.com',
        EVENT: 'https://events.dev-auth.com/',
        HOTH: 'https://models.dev-auth.com/',
        SCYLLA: 'https://app.dev-auth.com',
        NAUTILUS: 'https://data.dev-auth.com',
      },
      TOS_URL: 'https://authentise.com/tech/etos.html',
    };
}
