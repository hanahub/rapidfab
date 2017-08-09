import Constants from 'rapidfab/constants';

export const initialState = {
  ordersByLocation: null,
  fetching: false,
  errors: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.ORDER_LOCATION_REQUEST:
      return Object.assign({}, state, {
        fetching: true,
        errors: [],
      });
    case Constants.ORDER_LOCATION_FAILURE:
      return Object.assign({}, state, {
        fetching: false,
        errors: action.errors,
      });
    case Constants.ORDER_LOCATION_SUCCESS:
      return Object.assign({}, state, {
        ordersByLocation: action.payload,
        fetching: false,
        errors: [],
      });
    default:
      return state;
  }
}

export default reducer;
