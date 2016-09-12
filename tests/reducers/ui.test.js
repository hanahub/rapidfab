const _           = require('lodash')
const expect      = require('chai').expect
const Reducer     = require('rapidfab/reducers/ui')
const Constants   = require('rapidfab/constants')
const Uuid        = require('node-uuid')
const Api         = require('rapidfab/api')

describe('ui', function(){
  const uuid = Uuid.v4()
  const record = {
    uuid,
    url: `https://rapidfab.auth.dev/user/${uuid}`,
    name: "Kenny Powers"
  }

  describe('#reducer', function(){

    it('initializes from resources', function(){
      let action = {
        type: "SOME_UNKNOWN_ACTION",
      }
      let initialMethodState = {
        fetching    : false,
        payload     : null,
        uuid        : null,
        filters     : null,
        errors      : [],
        count       : 0
      }
      let expected = _.reduce(Api.RESOURCES, function(result, resources, host) {
        result[host] = {}
        _.forEach(resources, function(resource) {
          result[host][resource] = {
            post    : initialMethodState,
            put     : initialMethodState,
            get     : initialMethodState,
            list    : initialMethodState,
            delete  : initialMethodState,
          }
        })
        return result
      }, {})
      let results = Reducer.default(undefined, action)
      expect(results).to.eql(expected)
    });

    ["POST", "PUT", "DELETE", "LIST", "GET"].forEach(function(method) {
      it(`reduces request ${method} action`, function(){
        let action = {
          type: `RESOURCE_${method}_REQUEST`,
          api: {
            host: "hoth",
            resource: "model",
            method: method
          },
          uuid: uuid,
          payload: record,
          filters: record,
        }
        let expected = _.assign({}, Reducer.initialState)
        let results = Reducer.default(undefined, action)
        expected.hoth.model[method.toLowerCase()] = {
          fetching: true,
          payload: action.payload,
          uuid: action.uuid,
          filters: action.filters,
          errors: [],
          count: 1
        }
        expect(results).to.eql(expected)
      })
    });

    ["POST", "PUT", "DELETE", "LIST", "GET"].forEach(function(method) {
      it(`reduces success ${method} action`, function(){
        let action = {
          type: `RESOURCE_${method}_SUCCESS`,
          api: {
            host: "hoth",
            resource: "model",
            method: method
          },
          uuid: uuid,
          payload: record,
          filters: record,
        }
        let expected = _.assign({}, Reducer.initialState)
        expected.hoth.model[method.toLowerCase()] = {
          fetching: true,
          payload: action.payload,
          uuid: action.uuid,
          filters: action.filters,
          errors: [],
          count: 0
        }
        let results = Reducer.default(expected, action)
        expected.hoth.model[method.toLowerCase()] = {
          fetching: false,
          payload: action.payload,
          uuid: action.uuid,
          filters: action.filters,
          errors: [],
          count: 1
        }
        expect(results).to.eql(expected)
      })
    });

    ["POST", "PUT", "DELETE", "LIST", "GET"].forEach(function(method) {
      it(`reduces failure ${method} action`, function(){
        let action = {
          type: `RESOURCE_${method}_FAILURE`,
          api: {
            host: "hoth",
            resource: "model",
            method: method
          },
          uuid: uuid,
          payload: record,
          filters: record,
          errors: [ "some-error" ],
        }
        let expected = _.assign({}, Reducer.initialState)
        expected.hoth.model[method.toLowerCase()] = {
          fetching: true,
          payload: action.payload,
          uuid: action.uuid,
          filters: action.filters,
          errors: [],
          count: 0
        }
        let results = Reducer.default(expected, action)
        expected.hoth.model[method.toLowerCase()] = {
          fetching: false,
          payload: action.payload,
          uuid: action.uuid,
          filters: action.filters,
          errors: action.errors,
          count: 1
        }
        expect(results).to.eql(expected)
      })
    });
  })
})
