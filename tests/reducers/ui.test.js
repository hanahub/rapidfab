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
        fetching: false,
        errors: [],
        uuid: null,
        filters: null,
        payload: null
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
          payload: null,
          filters: null
        }
        let results = Reducer.default(undefined, action)
        results = results.hoth.model[method.toLowerCase()]
        expect(results.fetching).to.eql(true)
        expect(results.errors).to.eql([])
        expect(results.uuid).to.eql(uuid)
        expect(results.payload).to.eql(null)
        expect(results.filters).to.eql(null)
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
          filters: null
        }
        let results = Reducer.default(undefined, action)
        results = results.hoth.model[method.toLowerCase()]
        expect(results.fetching).to.eql(false)
        expect(results.errors).to.eql([])
        expect(results.uuid).to.eql(uuid)
        expect(results.payload).to.eql(record)
        expect(results.filters).to.eql(null)
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
          payload: null,
          filters: record,
          errors: [ "some-error" ]
        }
        let results = Reducer.default(undefined, action)
        results = results.hoth.model[method.toLowerCase()]
        expect(results.fetching).to.eql(false)
        expect(results.errors).to.eql(action.errors)
        expect(results.uuid).to.eql(uuid)
        expect(results.payload).to.eql(null)
        expect(results.filters).to.eql(record)
      })
    });
  })
})
