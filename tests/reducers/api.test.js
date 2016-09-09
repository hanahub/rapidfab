const _           = require('lodash')
const expect      = require('chai').expect
const Reducer     = require('rapidfab/reducers/api')
const Constants   = require('rapidfab/constants')
const Uuid        = require('node-uuid')
const Api         = require('rapidfab/api')

describe('api', function(){
  const uuid = Uuid.v4()
  const record = {
    uri: `https://rapidfab.auth.dev/user/${uuid}/`,
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
          result[host][resource] = []
        })
        return result
      }, {})
      let results = Reducer.default(undefined, action)
      expect(results).to.eql(expected)
    });

    it(`reduces success POST action`, function(){
      let action = {
        type: `RESOURCE_POST_SUCCESS`,
        api: {
          host: "hoth",
          resource: "model",
          method: "POST"
        },
        headers: {
          location: record.uri
        }
      }

      let expected = _.assign({}, Reducer.initialState)
      let results = Reducer.default(expected, action)
      expected.hoth.model = [uuid]
      expect(results).to.eql(expected)

      results = Reducer.default(expected, action)
      expect(results).to.eql(expected)
    });

    it(`reduces success GET action`, function(){
      let action = {
        type: `RESOURCE_GET_SUCCESS`,
        api: {
          host: "hoth",
          resource: "model",
          method: "GET"
        },
        json: record
      }

      let expected = _.assign({}, Reducer.initialState)
      let results = Reducer.default(expected, action)
      expected.hoth.model = [uuid]
      expect(results).to.eql(expected)

      results = Reducer.default(expected, action)
      expect(results).to.eql(expected)
    });

    it(`reduces success DELETE action`, function(){
      let action = {
        type: `RESOURCE_DELETE_SUCCESS`,
        api: {
          host: "hoth",
          resource: "model",
          method: "DELETE"
        },
        uuid
      }

      let expected = _.assign({}, Reducer.initialState)
      expected.hoth.model = [uuid]

      let results = Reducer.default(expected, action)
      expected.hoth.model = []
      expect(results).to.eql(expected)
    });

    it(`reduces success LIST action`, function(){
      let uuid1 = Uuid.v4()
      let uuid2 = Uuid.v4()
      let uuid3 = Uuid.v4()

      let action = {
        type: `RESOURCE_LIST_SUCCESS`,
        api: {
          host: "hoth",
          resource: "model",
          method: "LIST"
        },
        json: {
          resources: [{
            uri: `https://rapidfab.auth.dev/user/${uuid1}/`,
            name: "Kenny Powers"
          }, {
            uri: `https://rapidfab.auth.dev/user/${uuid2}/`,
            name: "Kenny Powers"
          }, {
            uri: `https://rapidfab.auth.dev/user/${uuid3}/`,
            name: "Kenny Powers"
          }]
        }
      }

      let expected = _.assign({}, Reducer.initialState)
      expected.hoth.model = [uuid]

      let results = Reducer.default(expected, action)
      expected.hoth.model = [uuid, uuid1, uuid2, uuid3]
      expect(results).to.eql(expected)
    });

  })
})
