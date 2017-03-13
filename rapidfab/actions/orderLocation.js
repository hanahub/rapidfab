import Actions      from "rapidfab/actions"
import Constants    from 'rapidfab/constants';
import { doGet }    from 'rapidfab/api/makeApi'

function orderLocationRequest() {
  return {
    type: Constants.ORDER_LOCATION_REQUEST,
  }
}

function orderLocationSuccess(payload) {
  return {
    type: Constants.ORDER_LOCATION_SUCCESS,
    payload,
  }
}

export function getOrderLocations() {
  return dispatch => {
    dispatch(orderLocationRequest())
    doGet('https://erp.dev-auth.com/order-location/').then(response => {
      response.text().then(text => {
        try {
          let json = JSON.parse(text);
          console.log("Response", json);
          dispatch(orderLocationSuccess(json.resources))
        } catch (e) {
          console.error("Failed to parse as JSON", e);
          return
        }
      });
    }).catch(error => {
      console.error("Something bad happened", error);
    })
  }
}

function addError(errors) {
  return {
    type: Constants.ORDER_LOCATION_FAILURE,
    errors: errors,
  }
}
