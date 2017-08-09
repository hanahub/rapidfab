import _ from 'lodash';
import PathToRegexp from 'path-to-regexp';

export function extractUuid(uri) {
  const keys = [];
  const pattern = PathToRegexp(':protocol//:domain/:resource/:uuid/', keys);
  const match = pattern.exec(uri);
  if (!match || !match.length || match.length !== 5) {
    throw new Error(`Could not extract uuid from uri: ${uri}`);
  }
  return match[match.length - 1];
}

export function hydrateRecord(record) {
  if (!record || !record.uri) return record;
  const uuid = extractUuid(record.uri);
  return Object.assign({}, record, {
    uuid,
    id: uuid.substr(uuid.length - 6),
  });
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

function makeGet(host, resource) {
  const typePrefix = `${host}_${resource}`.toUpperCase();
  return {
    [`${typePrefix}_GET_REQUEST`](state) {
      return Object.assign({}, state, {
        uxFetching: true,
        uxErrors: [],
      });
    },
    [`${typePrefix}_GET_SUCCESS`](state, action) {
      const record = hydrateRecord(action.json);
      return Object.assign({}, state, {
        [record.uuid]: record,
        uxFetching: false,
        uxErrors: [],
      });
    },
    [`${typePrefix}_GET_FAILURE`](state, action) {
      let uxErrors = [];
      if (action.error) {
        uxErrors = [{ code: 'API Error', title: action.error.message }];
      } else {
        uxErrors = action.json.errors;
      }
      return Object.assign({}, state, {
        uxFetching: false,
        uxErrors,
      });
    },
  };
}

function makeList(host, resource) {
  const typePrefix = `${host}_${resource}`.toUpperCase();
  return {
    [`${typePrefix}_LIST_REQUEST`](state) {
      return Object.assign({}, state, {
        uxFetching: true,
        uxErrors: [],
      });
    },
    [`${typePrefix}_LIST_SUCCESS`](state, action) {
      const records = _.map(action.json.resources, hydrateRecord);
      return Object.assign({}, state, {
        uxFetching: false,
        uxErrors: [],
      }, _.keyBy(records, 'uuid'));
    },
    [`${typePrefix}_LIST_FAILURE`](state, action) {
      let uxErrors = [];
      if (action.error) {
        uxErrors = [{ code: 'API Error', title: action.error.message }];
      } else {
        uxErrors = action.json.errors;
      }
      return Object.assign({}, state, {
        uxFetching: false,
        uxErrors,
      });
    },
  };
}

function makePut(host, resource) {
  const typePrefix = `${host}_${resource}`.toUpperCase();
  return {
    [`${typePrefix}_PUT_REQUEST`](state) {
      return Object.assign({}, state, {
        uxFetching: true,
        uxErrors: [],
      });
    },
    [`${typePrefix}_PUT_SUCCESS`](state, action) {
      const record = hydrateRecord(action.payload);
      return Object.assign({}, state, {
        [record.uuid]: record,
        uxFetching: false,
        uxErrors: [],
      });
    },
    [`${typePrefix}_PUT_FAILURE`](state, action) {
      let uxErrors = [];
      if (action.error) {
        uxErrors = [{ code: 'API Error', title: action.error.message }];
      } else {
        uxErrors = action.json.errors;
      }
      return Object.assign({}, state, {
        uxFetching: false,
        uxErrors,
      });
    },
  };
}

function makePost(host, resource) {
  const typePrefix = `${host}_${resource}`.toUpperCase();
  return {
    [`${typePrefix}_POST_REQUEST`](state) {
      return Object.assign({}, state, {
        uxFetching: true,
        uxErrors: [],
      });
    },
    [`${typePrefix}_POST_SUCCESS`](state, action) {
      const record = hydrateRecord(Object.assign(action.payload, {
        uri: action.headers.location,
        uploadUri: action.headers['X-Upload-Location'],
      }));
      return Object.assign({}, state, {
        [record.uuid]: record,
        uxFetching: false,
        uxErrors: [],
      });
    },
    [`${typePrefix}_POST_FAILURE`](state, action) {
      let uxErrors = [];
      if (action.error) {
        uxErrors = [{ code: 'API Error', title: action.error.message }];
      } else {
        uxErrors = action.json.errors;
      }
      return Object.assign({}, state, {
        uxFetching: false,
        uxErrors,
      });
    },
  };
}

function makeDelete(host, resource) {
  const typePrefix = `${host}_${resource}`.toUpperCase();
  return {
    [`${typePrefix}_DELETE_REQUEST`](state) {
      return Object.assign({}, state, {
        uxFetching: true,
        uxErrors: [],
      });
    },
    [`${typePrefix}_DELETE_SUCCESS`](state, action) {
      const newState = Object.assign({}, state, {
        uxFetching: false,
        uxErrors: [],
      });
      delete newState[action.uuid];
      return newState;
    },
    [`${typePrefix}_DELETE_FAILURE`](state, action) {
      let uxErrors = [];
      if (action.error) {
        uxErrors = [{ code: 'API Error', title: action.error.message }];
      } else {
        uxErrors = action.json.errors;
      }
      return Object.assign({}, state, {
        uxFetching: false,
        uxErrors,
      });
    },
  };
}

export function makeApiReducers(resources) {
  const initialState = {
    uxFetching: false,
    uxErrors: [],
  };
  return _.reduce(resources, (result, resourceNames, host) => {
    const newResult = result;
    resourceNames.forEach((resource) => {
      newResult[resource] = createReducer(initialState, _.assign(
        makeGet(host, resource),
        makeList(host, resource),
        makePost(host, resource),
        makePut(host, resource),
        makeDelete(host, resource),
      ));
    });
    return newResult;
  }, {});
}
