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
    if(payload.id) delete payload.id
    if(payload.uri) delete payload.uri
    if(payload.uuid) delete payload.uuid

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
    if(payload.id) delete payload.id
    if(payload.uri) delete payload.uri
    if(payload.uuid) delete payload.uuid

    return fetch(`${hostRoot}/${resource}/`, _.assign({}, FETCH_CONFIG, {
      credentials : 'include',
      method: "post",
      body: JSON.stringify(payload)
    }, config))
  }
}

function makeGet(hostRoot, resource) {
  return (uuid, config) => {
    let url = `${hostRoot}/${resource}/`
    if(uuid) url += `${uuid}/`
    return fetch(url, _.assign({
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


export const postForm = function(url, payload, files, method, withCredentials, contentType, progressCallback) {
  method = method || "POST";

  var promise = new Promise(function(resolve, reject) {
    var data = new FormData();
    for(var key in payload) {
      if(payload.hasOwnProperty(key)) {
        data.append(key, payload[key]);
      }
    }
    for(var key in files) {
      if(files.hasOwnProperty(key)) {
        data.append(key, files[key], files[key].name);
      }
    }
    var http = new XMLHttpRequest();
    if (http.hasOwnProperty('withCredentials')) {
      http.withCredentials = !!withCredentials;
    }

    var handleProgress = function(e) {
      var percent = Math.floor(e.loaded/e.total*1000)/10;
      progressCallback(percent);
    }

    http.addEventListener('progress', handleProgress, false);
    if(http.upload) {
      http.upload.onprogress = handleProgress;
    }

    http.onload = function() {
      resolve(http.responseText);
    }

    http.addEventListener("error", reject, false);
    http.addEventListener("abort", reject, false);

    http.open(method, url, true);
    if(contentType) {
      http.setRequestHeader("Content-Type", contentType);
      http.send(files);
    } else {
      http.send(data);
    }
  });
  return promise;
}

export default makeApi
