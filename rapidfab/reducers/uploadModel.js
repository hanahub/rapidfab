import _         from 'lodash';
import Constants from 'rapidfab/constants';

function upload(state = {
  isFetching: false,
  uxErrors: [],
  percent: 0,
}, action) {
  switch (action.type) {
    case Constants.UPLOAD_MODEL:
      return Object.assign({}, state, {
        isFetching: true,
        uxErrors: [],
      });
    case Constants.UPLOAD_PROGRESS:
      return Object.assign({}, state, {
        isFetching: false,
        uxErrors: [],
        percent: action.percent
      });
    default:
      return state
  }
}

export default upload
