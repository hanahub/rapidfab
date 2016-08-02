var expect = require('expect'),
    config = require('rapidfab/config');

describe('config', function(){
  describe('#SENTRY_DSN', function(){
    it('has a sentry dsn config', function(){
      expect(config.SENTRY_DSN).toEqual(null);
    });
  });

  describe('#HOST', function(){
    it('has a pao host config', function(){
      expect(config.HOST.PAO).toBeA('string');
    });
  });
});
