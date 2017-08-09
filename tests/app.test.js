const expect = require('expect');
const config = require('rapidfab/config');

describe('config', () => {
  describe('#SENTRY_DSN', () => {
    it('has a sentry dsn config', () => {
      expect(config.SENTRY_DSN).toEqual(null);
    });
  });

  describe('#HOST', () => {
    it('has a pao host config', () => {
      expect(config.HOST.PAO).toBeA('string');
    });
  });
});
