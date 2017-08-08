const _ = require('lodash');
const expect = require('chai').expect;
const Reducer = require('rapidfab/reducers/uploadModel');
const Constants = require('rapidfab/constants');
const Uuid = require('node-uuid');


describe('uploadModel', () => {
  const uuid = Uuid.v4();
  const record = {
    uuid,
    uri: `https://rapidfab.auth.dev/user/${uuid}/`,
    name: 'Kenny Powers',
  };

  describe('#reducer', () => {
    it('reduces RESOURCE_POST_SUCCESS action non model type', () => {
      const action = {
        type: 'RESOURCE_POST_SUCCESS',
        api: {
          host: 'hoth',
          resource: 'snapshot',
          method: 'POST',
        },
        uuid,
        headers: {
          location: record.uri,
          uploadLocation: record.uri,
        },
      };

      const expected = _.assign({}, Reducer.initialState);
      const results = Reducer.default(expected, action);
      expect(results).to.eql(expected);
    });

    it('reduces RESOURCE_POST_SUCCESS action as model type', () => {
      const action = {
        type: 'RESOURCE_POST_SUCCESS',
        api: {
          host: 'hoth',
          resource: 'model',
          method: 'POST',
        },
        headers: {
          location: record.uri,
          uploadLocation: record.uri,
        },
      };

      const expected = _.assign({}, Reducer.initialState);
      const results = Reducer.default(expected, action);
      expected.modelUuid = uuid;
      expect(results).to.eql(expected);
    });

    it('reduces UPLOAD_MODEL_PROGRESS action', () => {
      const action = {
        type: 'UPLOAD_MODEL_PROGRESS',
        percent: 42,
      };

      const expected = _.assign({}, Reducer.initialState);
      const results = Reducer.default(expected, action);
      expected.percent = action.percent;
      expected.uploading = true;
      expect(results).to.eql(expected);
    });

    it('reduces UPLOAD_MODEL_STORE_PAYLOAD action', () => {
      const action = {
        type: 'UPLOAD_MODEL_STORE_PAYLOAD',
        payload: {
          count: 42,
          name: 'New Order',
        },
      };

      const expected = _.assign({}, Reducer.initialState);
      const results = Reducer.default(expected, action);
      expected.orderPayload = action.payload;
      expect(results).to.eql(expected);
    });

    it('reduces UPLOAD_MODEL_CLEAR action', () => {
      const action = {
        type: 'UPLOAD_MODEL_CLEAR',
      };

      const initialState = _.assign({}, Reducer.initialState);
      initialState.percent = 42;
      const results = Reducer.default(initialState, action);
      expect(results).to.eql(Reducer.initialState);
    });

    it('reduces UPLOAD_MODEL_REQUEST action', () => {
      const action = {
        type: 'UPLOAD_MODEL_REQUEST',
        uploadUrl: record.uri,
      };

      const expected = _.assign({}, Reducer.initialState);
      const results = Reducer.default(expected, action);
      expected.uploadLocation = record.uri;
      expected.percent = 0;
      expected.uploading = true;
      expect(results).to.eql(expected);
    });
  });
});
