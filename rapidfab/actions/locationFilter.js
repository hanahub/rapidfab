import Actions      from "rapidfab/actions"
import Constants    from 'rapidfab/constants';


export function storeLocation(location) {
  return {
    type: Constants.STORE_LOCATION,
    location,
  }
}

export function setLocation(location) {
  return dispatch => {
    dispatch(storeLocation(location))
  }
}
