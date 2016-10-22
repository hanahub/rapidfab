import _                from 'lodash';
import Constants        from 'rapidfab/constants';
import { RESOURCES }    from 'rapidfab/api'


const initialMethodState = {
  fetching    : false,
  payload     : null,
  uuid        : null,
  filters     : null,
  count       : 0,
  errors      : [],
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
          errors,
          count       : state.count + 1,
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
          errors,
          count       : state.count + 1,
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
    case Constants.CLEAR_UI_STATE:
      //user passes in paths in the ui state to be reset, or nothing, and resets all ui state
      // read _.set docs for path format https://lodash.com/docs/4.16.4#set
      let mask = {}
      let tempState = _.assign({}, state)

      if(action.paths.length > 0) {
        action.paths.map(function(path) {
          // uses the provided path to get the initial values, and uses the same path to set a mask object
          _.set(mask, path,  _.get(initialState, path))

          //we must unset the path we're replacing, or the mask wont modify, because its empty
          _.unset(tempState, path)
        })

        // deep applies the initial state paths to current state
        return _.merge({}, tempState, mask)
      }
      // if they dont pass in paths, reset it all
      return initialState
    default:
      return state
  }
}

export default reducer
