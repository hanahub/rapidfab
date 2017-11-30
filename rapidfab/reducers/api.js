import _ from 'lodash';
import Constants from 'rapidfab/constants';
import { RESOURCES } from 'rapidfab/api';
import PathToRegexp from 'path-to-regexp';
import extractUuid from 'rapidfab/utils/extractUuid';

export const initialState = _.reduce(
  RESOURCES,
  (result, hostResources, host) => {
    result[host] = {};
    for (const hostResource of hostResources) {
      result[host][hostResource] = [];
    }
    return result;
  },
  {}
);

function reduceResource(state, action) {
  return _.assign({}, state, {
    [action.api.resource]: reduceMethod(state[action.api.resource], action),
  });
}

function reduceMethod(state, action) {
  const { type, uuid, json, headers } = action;

  switch (type) {
    case Constants.RESOURCE_POST_SUCCESS:
      return _.union(state, [extractUuid(headers.location)]);
    case Constants.RESOURCE_LIST_SUCCESS:
      return _.union(
        state,
        _.map(json.resources, record => extractUuid(record.uri))
      );
    case Constants.RESOURCE_GET_SUCCESS:
      return _.union(state, [extractUuid(json.uri)]);
    case Constants.RESOURCE_DELETE_SUCCESS:
    case Constants.RESOURCE_MANUAL_REMOVE:
      return _.without(state, uuid);
    default:
      return state;
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.RESOURCE_POST_SUCCESS:
    case Constants.RESOURCE_PUT_SUCCESS:
    case Constants.RESOURCE_LIST_SUCCESS:
    case Constants.RESOURCE_GET_SUCCESS:
    case Constants.RESOURCE_DELETE_SUCCESS:
    case Constants.RESOURCE_MANUAL_REMOVE:
      return _.assign({}, state, {
        [action.api.host]: reduceResource(state[action.api.host], action),
      });
    default:
      return state;
  }
}

export default reducer;
