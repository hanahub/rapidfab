import _             from 'lodash'
import PathToRegexp  from 'path-to-regexp';

export function extractUuid(uri) {
  let keys = [];
  let pattern = PathToRegexp(`:protocol//:domain/:resource/:uuid/`, keys);
  let match = pattern.exec(uri);
  if(!match.length) {
    throw new Error(`Could not extract uuid from uri: ${uri}`)
  }
  return match[match.length - 1]
}

export function hydrateRecord(record) {
  if(!record || !record.uri) return record;
  let uuid = extractUuid(record.uri);
  return Object.assign({}, record, {
    uuid,
    id: uuid.substr(uuid.length - 6)
  });
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }
    return state
  }
}

function makeGet(host, resource) {
  let typePrefix = `${host}_${resource}`.toUpperCase()
  return {
    [`${typePrefix}_GET_REQUEST`](state, action) {
      return Object.assign({}, state, {
        uxFetching  : true,
        uxErrors    : null
      })
    },
    [`${typePrefix}_GET_SUCCESS`](state, action) {
      let record = hydrateRecord(action.json);
      return Object.assign({}, state, {
        [record.uuid]   : record,
        uxFetching      : false,
        uxErrors        : null
      })
    },
    [`${typePrefix}_GET_FAILURE`](state, action) {
      return Object.assign({}, state, {
        uxFetching  : false,
        uxErrors    : action.error || action.json.errors
      })
    }
  }
}

function makeList(host, resource) {
  let typePrefix = `${host}_${resource}`.toUpperCase()
  return {
    [`${typePrefix}_LIST_REQUEST`](state, action) {
      return Object.assign({}, state, {
        uxFetching  : true,
        uxErrors    : null
      })
    },
    [`${typePrefix}_LIST_SUCCESS`](state, action) {
      let records = _.map(action.json.resources, hydrateRecord);
      return Object.assign({}, state, {
        uxFetching  : false,
        uxErrors    : null
      }, _.keyBy(records, "uuid"))
    },
    [`${typePrefix}_LIST_FAILURE`](state, action) {
      return Object.assign({}, state, {
        uxFetching  : false,
        uxErrors    : action.error || action.json.errors
      })
    }
  }
}

function makePut(host, resource) {
  let typePrefix = `${host}_${resource}`.toUpperCase()
  return {
    [`${typePrefix}_PUT_REQUEST`](state, action) {
      return Object.assign({}, state, {
        uxFetching  : true,
        uxErrors    : null
      })
    },
    [`${typePrefix}_PUT_SUCCESS`](state, action) {
      let record = hydrateRecord(action.payload);
      return Object.assign({}, state, {
        [record.uuid]   : record,
        uxFetching      : false,
        uxErrors        : null
      })
    },
    [`${typePrefix}_PUT_FAILURE`](state, action) {
      return Object.assign({}, state, {
        uxFetching  : false,
        uxErrors    : action.error || action.json.errors
      })
    }
  }
}

function makePost(host, resource) {
  let typePrefix = `${host}_${resource}`.toUpperCase()
  return {
    [`${typePrefix}_POST_REQUEST`](state, action) {
      return Object.assign({}, state, {
        uxFetching  : true,
        uxErrors    : null
      })
    },
    [`${typePrefix}_POST_SUCCESS`](state, action) {
      let record = hydrateRecord(Object.assign(action.payload, {
        uri: action.headers.location
      }));
      return Object.assign({}, state, {
        [record.uuid]   : record,
        uxFetching      : false,
        uxErrors        : null
      })
    },
    [`${typePrefix}_POST_FAILURE`](state, action) {
      return Object.assign({}, state, {
        uxFetching  : false,
        uxErrors    : action.error || action.json.errors
      })
    }
  }
}

function makeDelete(host, resource) {
  let typePrefix = `${host}_${resource}`.toUpperCase()
  return {
    [`${typePrefix}_DELETE_REQUEST`](state, action) {
      return Object.assign({}, state, {
        uxFetching  : true,
        uxErrors    : null
      })
    },
    [`${typePrefix}_DELETE_SUCCESS`](state, action) {
      let newState = Object.assign({}, state, {
        uxFetching      : false,
        uxErrors        : null
      })
      delete newState[action.uuid]
      return newState
    },
    [`${typePrefix}_DELETE_FAILURE`](state, action) {
      return Object.assign({}, state, {
        uxFetching  : false,
        uxErrors    : action.error || action.json.errors
      })
    }
  }
}

export function makeApiReducers(resources) {
  let initialState = {
    uxFetching  : false,
    uxErrors    : null
  }
  return _.reduce(resources, (result, resources, host) => {
    for(let resource of resources) {
      result[resource] = createReducer(initialState, _.assign(
        makeGet(host, resource),
        makeList(host, resource),
        makePost(host, resource),
        makePut(host, resource),
        makeDelete(host, resource)
      ))
    }
    return result;
  }, {});
}
