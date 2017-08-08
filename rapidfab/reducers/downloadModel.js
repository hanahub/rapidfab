import _ from 'lodash';
import Constants from 'rapidfab/constants';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

export const initialState = {
  downloadingModel: false,
  errors: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.DOWNLOAD_MODEL_REQUEST:
      return Object.assign({}, state, {
        downloadingModel: true,
        errors: [],
      });
    case Constants.DOWNLOAD_MODEL_FAILURE:
      return Object.assign({}, state, {
        downloadingModel: false,
        errors: action.errors,
      });
    case Constants.DOWNLOAD_MODEL_CONTENT:
      return Object.assign({}, state, {
        downloadingModel: false,
        errors: [],
      });
    default:
      return state;
  }
}

export default reducer;
