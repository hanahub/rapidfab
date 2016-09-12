const _           = require('lodash')
const expect      = require('expect')
const Reducer     = require('rapidfab/reducers/resources')
const Constants   = require('rapidfab/constants')
const Uuid        = require('node-uuid')

describe('resources', function(){
  const uuid = Uuid.v4()
  const id = uuid.substr(uuid.length - 6)
  const uri = `https://rapidfab.auth.dev/user/${uuid}`
  const name = "Kenny Powers"

  describe('#hydratesRecord', function(){

    it('hydrates a record', function(){
      let record = {
        uri,
        name
      }
      const result = Reducer.hydrateRecord(record)
      const expected = {
        uri,
        uuid,
        id,
        name
      }
      expect(result).toEqual(expected)
    })

  })
  describe('#extractsUuid', function(){

    it('extracts the uuid from a uri', function(){
      const result = Reducer.extractUuid(uri)
      expect(result).toEqual(uuid)
    })

  })
  describe('#reducer', function(){

    it('reduces EVENT_STREAM_MESSAGE new record', function(){
      const action = {
        type: "EVENT_STREAM_MESSAGE",
        payload: {
          uri,
          name
        }
      }
      let expected = {
        [uuid]: {
          id,
          uuid,
          uri,
          name
        }
      }
      const results = Reducer.default(undefined, action)
      expect(results).toEqual(expected)
    })

    it('reduces EVENT_STREAM_MESSAGE update record', function(){
      const action = {
        type: "EVENT_STREAM_MESSAGE",
        payload: {
          uri,
          name: "April Buchanon"
        }
      }
      let expected = {
        [uuid]: {
          id,
          uuid,
          uri,
          name: action.payload.name
        }
      }
      let initialState = {
        [uuid]: {
          id,
          uuid,
          uri,
          name
        }
      }
      const results = Reducer.default(initialState, action)
      expect(results).toEqual(expected)
    })

    it('reduces RESOURCE_GET_SUCCESS', function(){
      const action = {
        type: "RESOURCE_GET_SUCCESS",
        json: {
          uri,
          name
        }
      }
      const results = Reducer.default({}, action)
      const expected = {
        [uuid]: {
          id,
          uuid,
          uri,
          name
        }
      }
      expect(results).toEqual(expected)
    })

    it('reduces RESOURCE_PUT_SUCCESS', function(){
      const action = {
        type: "RESOURCE_PUT_SUCCESS",
        uuid,
        payload: {
          name: 'New Name'
        }
      }
      const state = {
        [uuid]: {
          id,
          uuid,
          uri,
          name: 'Old Name'
        }
      }
      const results = Reducer.default(state, action)
      const expected = {
        [uuid]: {
          id,
          uuid,
          uri,
          name: 'New Name'
        }
      }
      expect(results).toEqual(expected)
    })

    it('reduces RESOURCE_POST_SUCCESS', function(){
      const action = {
        type: "RESOURCE_POST_SUCCESS",
        payload: {
          name
        },
        headers: {
          location: uri
        }
      }
      const results = Reducer.default({}, action)
      const expected = {
        [uuid]: {
          id,
          uuid,
          uri,
          name
        }
      }
      expect(results).toEqual(expected)
    })

    it('reduces RESOURCE_LIST_SUCCESS', function(){
      const uuid1 = Uuid.v4()
      const record1 = {
        uuid  : uuid1,
        id    : uuid.substr(uuid1.length - 6),
        uri   : `https://rapidfab.auth.dev/user/${uuid1}`,
        name
      }
      const action = {
        type: "RESOURCE_LIST_SUCCESS",
        json: {
          resources: [{
            uri,
            name: 'Kenny Powers'
          }]
        }
      }
      const initialState = {
        [uuid1]: record1
      }
      const results = Reducer.default(initialState, action)
      const expected = {
        [uuid1] : record1,
        [uuid]  : {
          id,
          uuid,
          uri,
          name
        }
      }
      expect(results).toEqual(expected)
    })

    it('reduces RESOURCE_DELETE_SUCCESS', function(){
      const action = {
        type: "RESOURCE_DELETE_SUCCESS",
        uuid,
      }
      const state = {
        [uuid]: {
          id,
          uuid,
          uri,
          name
        }
      }
      const results = Reducer.default(state, action)
      const expected = {}
      expect(results).toEqual(expected)
    })

  })
})
