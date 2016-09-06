import _                from 'lodash';
import Constants        from 'rapidfab/constants';
import { RESOURCES }    from 'rapidfab/api'


const initialMethodState = {
  fetching    : false,
  errors      : [],
  uuid        : null,
  filters     : null,
  payload     : null
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

function reduceResource(state, action) {
  return _.assign({}, state, {
    [action.api.resource]: reduceMethod(state, action)
  })
}

function reduceMethod(state, action) {
  const {
    type,
    api,
    uuid,
    payload,
    filters,
    errors = []
  } = action

  let method = api.method.toLowerCase()

  switch (type) {
    case Constants.RESOURCE_POST_REQUEST:
    case Constants.RESOURCE_PUT_REQUEST:
    case Constants.RESOURCE_LIST_REQUEST:
    case Constants.RESOURCE_GET_REQUEST:
    case Constants.RESOURCE_DELETE_REQUEST:
      return _.assign({}, state, {
        [method]: {
          fetching    : true,
          errors      : errors,
          uuid        : uuid,
          filters     : filters,
          payload     : payload
        }
      })
    case Constants.RESOURCE_POST_SUCCESS:
    case Constants.RESOURCE_PUT_SUCCESS:
    case Constants.RESOURCE_LIST_SUCCESS:
    case Constants.RESOURCE_GET_SUCCESS:
    case Constants.RESOURCE_DELETE_SUCCESS:
      return _.assign({}, state, {
        [method]: {
          fetching    : false,
          errors      : errors,
          uuid        : uuid,
          filters     : filters,
          payload     : payload
        }
      })
    case Constants.RESOURCE_POST_FAILURE:
    case Constants.RESOURCE_PUT_FAILURE:
    case Constants.RESOURCE_LIST_FAILURE:
    case Constants.RESOURCE_GET_FAILURE:
    case Constants.RESOURCE_DELETE_FAILURE:
      return _.assign({}, state, {
        [method]: {
          fetching    : false,
          errors      : errors,
          uuid        : uuid,
          filters     : filters,
          payload     : payload
        }
      })
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
        [action.api.host]: reduceResource(state, action)
      })
    default:
      return state
  }
}

export default reducer
