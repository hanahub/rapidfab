const _ = require('lodash');
const expect = require('chai').expect;
const Reducer = require('rapidfab/reducers/api');
const Constants = require('rapidfab/constants');
const Uuid = require('node-uuid');
const Api = require('rapidfab/api');

describe('api', () => {
  const uuid = Uuid.v4();
  const record = {
    uri: `https://rapidfab.auth.dev/user/${uuid}/`,
    name: 'Kenny Powers',
  };

  describe('#reducer', () => {
    it('initializes from resources', () => {
      const action = {
        type: 'SOME_UNKNOWN_ACTION',
      };
      const initialMethodState = {
        fetching: false,
        errors: [],
        uuid: null,
        filters: null,
        payload: null,
      };
      const expected = _.reduce(Api.RESOURCES, (result, resources, host) => {
        result[host] = {};
        _.forEach(resources, (resource) => {
          result[host][resource] = [];
        });
        return result;
      }, {});
      const results = Reducer.default(undefined, action);
      expect(results).to.eql(expected);
    });

    it('reduces success POST action', () => {
      const action = {
        type: 'RESOURCE_POST_SUCCESS',
        api: {
          host: 'hoth',
          resource: 'model',
          method: 'POST',
        },
        headers: {
          location: record.uri,
        },
      };

      const expected = _.assign({}, Reducer.initialState);
      let results = Reducer.default(expected, action);
      expected.hoth.model = [uuid];
      expect(results).to.eql(expected);

      results = Reducer.default(expected, action);
      expect(results).to.eql(expected);
    });

    it('reduces success GET action', () => {
      const action = {
        type: 'RESOURCE_GET_SUCCESS',
        api: {
          host: 'hoth',
          resource: 'model',
          method: 'GET',
        },
        json: record,
      };

      const expected = _.assign({}, Reducer.initialState);
      let results = Reducer.default(expected, action);
      expected.hoth.model = [uuid];
      expect(results).to.eql(expected);

      results = Reducer.default(expected, action);
      expect(results).to.eql(expected);
    });

    it('reduces success DELETE action', () => {
      const action = {
        type: 'RESOURCE_DELETE_SUCCESS',
        api: {
          host: 'hoth',
          resource: 'model',
          method: 'DELETE',
        },
        uuid,
      };

      const expected = _.assign({}, Reducer.initialState);
      expected.hoth.model = [uuid];

      const results = Reducer.default(expected, action);
      expected.hoth.model = [];
      expect(results).to.eql(expected);
    });

    it('reduces success LIST action', () => {
      const uuid1 = Uuid.v4();
      const uuid2 = Uuid.v4();
      const uuid3 = Uuid.v4();

      const action = {
        type: 'RESOURCE_LIST_SUCCESS',
        api: {
          host: 'hoth',
          resource: 'model',
          method: 'LIST',
        },
        json: {
          resources: [{
            uri: `https://rapidfab.auth.dev/user/${uuid1}/`,
            name: 'Kenny Powers',
          }, {
            uri: `https://rapidfab.auth.dev/user/${uuid2}/`,
            name: 'Kenny Powers',
          }, {
            uri: `https://rapidfab.auth.dev/user/${uuid3}/`,
            name: 'Kenny Powers',
          }],
        },
      };

      const expected = _.assign({}, Reducer.initialState);
      expected.hoth.model = [uuid];

      const results = Reducer.default(expected, action);
      expected.hoth.model = [uuid, uuid1, uuid2, uuid3];
      expect(results).to.eql(expected);
    });
  });
});
