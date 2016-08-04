import _      from 'lodash'
import Config from 'rapidfab/config'

export const FETCH_CONFIG = {
  headers: {
    'Accept'        : 'application/json',
    'Content-Type'  : 'application/json'
  }
}

export function filtersToQuery(filters) {
  let formatted = [];
  for(let key in (filters || {})) {
    let values = filters[key];
    if(!values) continue;
    if(typeof values === "Array") values = values.join(',');
    formatted.push(`filter[${key}]=${values}`);
  }
  if(!formatted.length) return;
  return formatted.join('&');
}

function makePut(hostRoot, resource) {
  return (uuid, payload, config) => {
    delete payload['id']
    delete payload['uri']
    delete payload['uuid']

    return fetch(`${hostRoot}/${resource}/${uuid}/`, _.assign({}, FETCH_CONFIG, {
      credentials : 'include',
      method: "put",
      body: JSON.stringify(payload)
    }, config))
  }
}

function makeDelete(hostRoot, resource) {
  return (uuid, config) => {
    return fetch(`${hostRoot}/${resource}/${uuid}/`, _.assign({}, FETCH_CONFIG, {
      credentials : 'include',
      method: "delete"
    }, config))
  }
}

function makePost(hostRoot, resource) {
  return (payload, config) => {
    delete payload['id']
    delete payload['uri']
    delete payload['uuid']

    return fetch(`${hostRoot}/${resource}/`, _.assign({}, FETCH_CONFIG, {
      credentials : 'include',
      method: "post",
      body: JSON.stringify(payload)
    }, config))
  }
}

function makeGet(hostRoot, resource) {
  return (uuid, config) => {
    return fetch(`${hostRoot}/${resource}/${uuid}`, _.assign({
      credentials : 'include'
    }, FETCH_CONFIG, config))
  }
}

function makeList(hostRoot, resource) {
  return (filters, config) => {
    let query = filtersToQuery(filters) || ""
    let fetchConfig = _.assign({
      credentials : 'include'
    }, FETCH_CONFIG, config)
    return fetch(`${hostRoot}/${resource}/${query}`, fetchConfig)
  }
}

function makeApi(hostResources) {
  return _.reduce(hostResources, (result, resources, host) => {
    let hostRoot = Config.HOST[host.toUpperCase()]
    let hostResources = {}
    for(let resource of resources) {
      hostResources[resource] = {
        post: makePost(hostRoot, resource),
        list: makeList(hostRoot, resource),
        delete: makeDelete(hostRoot, resource),
        put: makePut(hostRoot, resource),
        get: makeGet(hostRoot, resource)
      }
    }
    result[host] = hostResources
    return result;
  }, {});
}

export default makeApi
