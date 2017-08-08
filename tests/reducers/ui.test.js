const _ = require('lodash');
const expect = require('chai').expect;
const Reducer = require('rapidfab/reducers/ui');
const Constants = require('rapidfab/constants');
const Uuid = require('node-uuid');
const Api = require('rapidfab/api');

describe('ui', () => {
  const uuid = Uuid.v4();
  const record = {
    uuid,
    url: `https://rapidfab.auth.dev/user/${uuid}`,
    name: 'Kenny Powers',
  };

  describe('#reducer', () => {
    it('initializes from resources', () => {
      const action = {
        type: 'SOME_UNKNOWN_ACTION',
      };
      const initialMethodState = {
        fetching: false,
        payload: null,
        uuid: null,
        filters: null,
        errors: [],
        count: 0,
      };
      const expected = _.reduce(Api.RESOURCES, (result, resources, host) => {
        result[host] = {};
        _.forEach(resources, (resource) => {
          result[host][resource] = {
            post: initialMethodState,
            put: initialMethodState,
            get: initialMethodState,
            list: initialMethodState,
            delete: initialMethodState,
          };
        });
        return result;
      }, {});
      const results = Reducer.default(undefined, action);
      expect(results).to.eql(expected);
    });

    it('reduces CLEAR_UI_STATE action no paths defined', () => {
      const action = {
        type: 'CLEAR_UI_STATE',
        paths: [],
      };

      const state = _.assign({}, Reducer.initialState);
      _.set(state, 'wyatt.order.post.errors', ['uh oh, bad news']);

      const results = Reducer.default(state, action);

      expect(results).to.eql(Reducer.initialState);
    });

    it('reduces CLEAR_UI_STATE action path defined', () => {
      const path = 'wyatt.order.post.errors';
      const action = {
        type: 'CLEAR_UI_STATE',
        paths: [path],
      };

      const alteredState = _.assign({}, Reducer.initialState);
      _.set(alteredState, path, ['uh oh, bad news']);

      const results = Reducer.default(alteredState, action);

      expect(results).to.eql(Reducer.initialState);
    });

    it('reduces CLEAR_UI_STATE action paths defined', () => {
      const paths = ['wyatt.order.post.errors', 'hoth.model.post.errors'];
      const action = {
        type: 'CLEAR_UI_STATE',
        paths,
      };

      const alteredState = _.assign({}, Reducer.initialState);
      paths.map((path) => {
        _.set(alteredState, path, ['uh oh, bad news']);
      });
      const expected = _.assign({}, Reducer.initialState);
      _.set(expected, 'wyatt.order.put.errors', "bad news, but we don't want to clear it");
      _.set(alteredState, 'wyatt.order.put.errors', "bad news, but we don't want to clear it");

      const results = Reducer.default(alteredState, action);

      expect(results).to.eql(expected);
    });

    ['POST', 'PUT', 'DELETE', 'LIST', 'GET'].forEach((method) => {
      it(`reduces request ${method} action`, () => {
        const action = {
          type: `RESOURCE_${method}_REQUEST`,
          api: {
            host: 'hoth',
            resource: 'model',
            method,
          },
          uuid,
          payload: record,
          filters: record,
        };
        const expected = _.assign({}, Reducer.initialState);
        const results = Reducer.default(undefined, action);
        expected.hoth.model[method.toLowerCase()] = {
          fetching: true,
          payload: action.payload,
          uuid: action.uuid,
          filters: action.filters,
          errors: [],
          count: 1,
        };
        expect(results).to.eql(expected);
      });
    });

    ['POST', 'PUT', 'DELETE', 'LIST', 'GET'].forEach((method) => {
      it(`reduces success ${method} action`, () => {
        const action = {
          type: `RESOURCE_${method}_SUCCESS`,
          api: {
            host: 'hoth',
            resource: 'model',
            method,
          },
          uuid,
          payload: record,
          filters: record,
        };
        const expected = _.assign({}, Reducer.initialState);
        expected.hoth.model[method.toLowerCase()] = {
          fetching: true,
          payload: action.payload,
          uuid: action.uuid,
          filters: action.filters,
          errors: [],
          count: 0,
        };
        const results = Reducer.default(expected, action);
        expected.hoth.model[method.toLowerCase()] = {
          fetching: false,
          payload: action.payload,
          uuid: action.uuid,
          filters: action.filters,
          errors: [],
          count: 1,
        };
        expect(results).to.eql(expected);
      });
    });

    ['POST', 'PUT', 'DELETE', 'LIST', 'GET'].forEach((method) => {
      it(`reduces failure ${method} action`, () => {
        const action = {
          type: `RESOURCE_${method}_FAILURE`,
          api: {
            host: 'hoth',
            resource: 'model',
            method,
          },
          uuid,
          payload: record,
          filters: record,
          errors: ['some-error'],
        };
        const expected = _.assign({}, Reducer.initialState);
        expected.hoth.model[method.toLowerCase()] = {
          fetching: true,
          payload: action.payload,
          uuid: action.uuid,
          filters: action.filters,
          errors: [],
          count: 0,
        };
        const results = Reducer.default(expected, action);
        expected.hoth.model[method.toLowerCase()] = {
          fetching: false,
          payload: action.payload,
          uuid: action.uuid,
          filters: action.filters,
          errors: action.errors,
          count: 1,
        };
        expect(results).to.eql(expected);
      });
    });
  });
});
