function makePost(api, host, resource) {
  let typePrefix = `${host}_${resource}`.toUpperCase()
  return (payload, config) => ({
    types: [
      `${typePrefix}_POST_REQUEST`,
      `${typePrefix}_POST_SUCCESS`,
      `${typePrefix}_POST_FAILURE`
    ],
    callApi: () => api[host][resource].post(payload, config),
    payload
  })
}

function makePut(api, host, resource) {
  let typePrefix = `${host}_${resource}`.toUpperCase()
  return (uuid, payload, config) => ({
    uuid,
    types: [
      `${typePrefix}_PUT_REQUEST`,
      `${typePrefix}_PUT_SUCCESS`,
      `${typePrefix}_PUT_FAILURE`
    ],
    callApi: () => api[host][resource].put(uuid, payload, config),
    payload
  })
}

function makeList(api, host, resource) {
  let typePrefix = `${host}_${resource}`.toUpperCase()
  return (filters, config) => ({
    filters,
    types: [
      `${typePrefix}_LIST_REQUEST`,
      `${typePrefix}_LIST_SUCCESS`,
      `${typePrefix}_LIST_FAILURE`
    ],
    shouldCallAPI: state => !state[host] || !state[host][resource],
    callApi: () => api[host][resource].list(filters, config)
  })
}

function makeGet(api, host, resource) {
  let typePrefix = `${host}_${resource}`.toUpperCase()
  return (uuid, config) => ({
    uuid,
    types: [
      `${typePrefix}_GET_REQUEST`,
      `${typePrefix}_GET_SUCCESS`,
      `${typePrefix}_GET_FAILURE`
    ],
    shouldCallAPI: state => !state[host] || !state[host][resource] || !state[host][resource][uuid],
    callApi: () => api[host][resource].get(uuid, config)
  })
}

function makeDelete(api, host, resource) {
  let typePrefix = `${host}_${resource}`.toUpperCase()
  return (uuid, config) => ({
    uuid,
    types: [
      `${typePrefix}_DELETE_REQUEST`,
      `${typePrefix}_DELETE_SUCCESS`,
      `${typePrefix}_DELETE_FAILURE`
    ],
    callApi: () => api[host][resource].delete(uuid, config)
  })
}

export function makeApiActions(api, resources) {
  return _.reduce(resources, (result, resources, host) => {
    let hostActions = {}
    for(let resource of resources) {
      hostActions[resource] = {
        post      : makePost(api, host, resource),
        list      : makeList(api, host, resource),
        delete    : makeDelete(api, host, resource),
        put       : makePut(api, host, resource),
        get       : makeGet(api, host, resource)
      }
    }
    result[host] = hostActions
    return result;
  }, {});
}
