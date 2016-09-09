import _                from 'lodash';
import Constants        from 'rapidfab/constants';
import { RESOURCES }    from 'rapidfab/api'


const initialMethodState = {
  fetching    : false,
  payload     : null,
  uuid        : null,
  filters     : null,
  errors      : []
}

export const initialState = _.reduce(RESOURCES, (result, hostResources, host) => {
  result[host] = {}
  for(let hostResource of hostResources) {
    result[host][hostResource] = {
      put     : initialMethodState,
      post    : initialMethodState,
      list    : initialMethodState,
      get     : initialMethodState,
      delete  : initialMethodState
    }
  }
  return result;
}, {})

function reduceHost(state, action) {
  return _.assign({}, state, {
    [action.api.resource]: reduceResource(state[action.api.resource], action)
  })
}

function reduceResource(state, action) {
  let method = action.api.method.toLowerCase()
  return _.assign({}, state, {
    [method]: reduceMethod(state[method], action)
  })
}

function reduceMethod(state, action) {
  const {
    type,
    payload = null,
    uuid = null,
    filters = null,
    errors = []
  } = action

  switch (type) {
    case Constants.RESOURCE_POST_REQUEST:
    case Constants.RESOURCE_PUT_REQUEST:
    case Constants.RESOURCE_LIST_REQUEST:
    case Constants.RESOURCE_GET_REQUEST:
    case Constants.RESOURCE_DELETE_REQUEST:
      return {
          fetching    : true,
          payload,
          uuid,
          filters,
          errors
      }
    case Constants.RESOURCE_POST_SUCCESS:
    case Constants.RESOURCE_PUT_SUCCESS:
    case Constants.RESOURCE_LIST_SUCCESS:
    case Constants.RESOURCE_GET_SUCCESS:
    case Constants.RESOURCE_DELETE_SUCCESS:
    case Constants.RESOURCE_POST_FAILURE:
    case Constants.RESOURCE_PUT_FAILURE:
    case Constants.RESOURCE_LIST_FAILURE:
    case Constants.RESOURCE_GET_FAILURE:
    case Constants.RESOURCE_DELETE_FAILURE:
      return {
          fetching    : false,
          payload,
          uuid,
          filters,
          errors
      }
    default:
      return state
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.RESOURCE_POST_REQUEST:
    case Constants.RESOURCE_PUT_REQUEST:
    case Constants.RESOURCE_LIST_REQUEST:
    case Constants.RESOURCE_GET_REQUEST:
    case Constants.RESOURCE_DELETE_REQUEST:
    case Constants.RESOURCE_POST_SUCCESS:
    case Constants.RESOURCE_PUT_SUCCESS:
    case Constants.RESOURCE_LIST_SUCCESS:
    case Constants.RESOURCE_GET_SUCCESS:
    case Constants.RESOURCE_DELETE_SUCCESS:
    case Constants.RESOURCE_POST_FAILURE:
    case Constants.RESOURCE_PUT_FAILURE:
    case Constants.RESOURCE_LIST_FAILURE:
    case Constants.RESOURCE_GET_FAILURE:
    case Constants.RESOURCE_DELETE_FAILURE:
      return _.assign({}, state, {
        [action.api.host]: reduceHost(state[action.api.host], action)
      })
    default:
      return state
  }
}

export default reducer
