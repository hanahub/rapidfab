import _ from 'lodash';
import Constants from 'rapidfab/constants';

const initialState = {
  hash: window.location.hash,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.HASH_CHANGE:
      return _.assign({}, state, {
        hash: action.data.newHash,
      });
    default:
      return state;
  }
}

export default reducer;
