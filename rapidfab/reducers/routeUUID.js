import Constants from 'rapidfab/constants';

const routeUUIDReducer = (state = "", action) => {
  switch (action.type) {
    case Constants.SET_ROUTE_UUID:
      return Object.assign({}, state, {uuid: action.uuid});
    default:
      return state;
  }
}

export default routeUUIDReducer
