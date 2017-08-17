import Config from 'rapidfab/config';
import Constants from 'rapidfab/constants';
import { doGet } from 'rapidfab/api/makeApi';

function orderLocationRequest() {
  return {
    type: Constants.ORDER_LOCATION_REQUEST,
  };
}

function orderLocationSuccess(payload) {
  return {
    type: Constants.ORDER_LOCATION_SUCCESS,
    payload,
  };
}

export function getOrderLocations() {
  return dispatch => {
    dispatch(orderLocationRequest());
    doGet(`${Config.HOST.WYATT}/order-location/`)
      .then(response => {
        response.text().then(text => {
          try {
            const json = JSON.parse(text);
            dispatch(orderLocationSuccess(json.resources));
          } catch (e) {
            dispatch(addError(e));
          }
        });
      })
      .catch(error => {
        dispatch(addError(error));
      });
  };
}

function addError(errors) {
  return {
    type: Constants.ORDER_LOCATION_FAILURE,
    errors,
  };
}
