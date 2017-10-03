import Constants from 'rapidfab/constants';

function makePost(api, host, resource) {
  return payload => ({
    api: {
      resource,
      host,
      method: 'POST',
    },
    types: [
      Constants.RESOURCE_POST_REQUEST,
      Constants.RESOURCE_POST_SUCCESS,
      Constants.RESOURCE_POST_FAILURE,
    ],
    callApi: () => api[host][resource].post(payload),
    payload,
  });
}

function makePut(api, host, resource) {
  return (uuid, payload) => ({
    api: {
      resource,
      host,
      method: 'PUT',
    },
    uuid,
    types: [
      Constants.RESOURCE_PUT_REQUEST,
      Constants.RESOURCE_PUT_SUCCESS,
      Constants.RESOURCE_PUT_FAILURE,
    ],
    callApi: () => api[host][resource].put(uuid, payload),
    payload,
  });
}

function makeList(api, host, resource) {
  return (filters, forced=false) => ({
    api: {
      resource,
      host,
      method: 'LIST',
    },
    callApi: () => api[host][resource].list(filters),
    filters,
    shouldCallAPI: state => {
      if(forced) return true;
      const request = state.ui[host][resource].list;
      const timeSinceLastRequest = (new Date() - request.finished);
      return !(request.fetching || (timeSinceLastRequest < 3000));
    },
    types: [
      Constants.RESOURCE_LIST_REQUEST,
      Constants.RESOURCE_LIST_SUCCESS,
      Constants.RESOURCE_LIST_FAILURE,
    ],
  });
}

function makeGet(api, host, resource) {
  return (uuid, forced=false) => ({
    api: {
      resource,
      host,
      method: 'GET',
    },
    callApi: () => api[host][resource].get(uuid),
    shouldCallAPI: state => {
      if(forced) return true;
      const request = state.ui[host][resource].get;
      const timeSinceLastRequest = new Date() - request.finished;
      return !(request.fetching || timeSinceLastRequest < 3000);
    },
    types: [
      Constants.RESOURCE_GET_REQUEST,
      Constants.RESOURCE_GET_SUCCESS,
      Constants.RESOURCE_GET_FAILURE,
    ],
    uuid,
  });
}

function makeDelete(api, host, resource) {
  return uuid => ({
    api: {
      resource,
      host,
      method: 'DELETE',
    },
    uuid,
    types: [
      Constants.RESOURCE_DELETE_REQUEST,
      Constants.RESOURCE_DELETE_SUCCESS,
      Constants.RESOURCE_DELETE_FAILURE,
    ],
    callApi: () => api[host][resource].delete(uuid),
  });
}

function makeRemove(api, host, resource) {
  return uuid => ({
    api: {
      resource,
      host,
      method: 'REMOVE',
    },
    uuid,
    type: Constants.RESOURCE_MANUAL_REMOVE,
  });
}
export function makeApiActions(api, resources) {
  return _.reduce(
    resources,
    (result, resources, host) => {
      const hostActions = {};
      for (const resource of resources) {
        hostActions[resource] = {
          post: makePost(api, host, resource),
          list: makeList(api, host, resource),
          delete: makeDelete(api, host, resource),
          put: makePut(api, host, resource),
          get: makeGet(api, host, resource),
          remove: makeRemove(api, host, resource),
        };
      }
      result[host] = hostActions;
      return result;
    },
    {}
  );
}
