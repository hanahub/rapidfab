import _ from 'lodash';
import Constants from 'rapidfab/constants';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

export const initialState = {
  uploadLocation: null,
  uploading: false,
  percent: 0,
  orderPayload: null,
  errors: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.RESOURCE_POST_SUCCESS:
      if (action.api.resource === 'model') {
        return Object.assign({}, state, {
          modelUuid: extractUuid(action.headers.location),
        });
      }
      return state;
    case Constants.UPLOAD_MODEL_REQUEST:
      return Object.assign({}, state, {
        uploadLocation: action.uploadUrl,
        uploading: true,
        percent: 0,
      });
    case Constants.UPLOAD_MODEL_PROGRESS:
      return Object.assign({}, state, {
        uploading: true,
        percent: action.percent,
      });
    case Constants.UPLOAD_MODEL_STORE_PAYLOAD:
      return Object.assign({}, state, {
        orderPayload: action.payload,
      });
    case Constants.UPLOAD_MODEL_CLEAR:
      return initialState;
    case Constants.UPLOAD_MODEL_ADD_ERROR:
      const errors = _.assign([], state.errors);

      action.errors.map((error) => {
        if (!_.find(errors, error)) {
          errors.push(error);
        }
      });
      return _.assign({}, state, {
        errors,
      });
    default:
      return state;
  }
}

export default reducer;
