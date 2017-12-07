import _ from 'lodash';
import Config from 'rapidfab/config';

import 'isomorphic-fetch';

export const FETCH_CONFIG = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const GET_CONFIG = {
  headers: {
    Accept: 'application/json',
  },
};

export const filtersToQuery = filters =>
  filters
    ? Object.keys(filters).reduce(
        (formattedFilters, filterKey) =>
          `${formattedFilters}${formattedFilters.length
            ? '&'
            : ''}filter[${filterKey}]=${encodeURIComponent(
            filters[filterKey]
          )}`,
        ''
      )
    : null;

function sanitizePayload(payload) {
  const sanitizedPayload = Object.assign({}, payload);
  if (sanitizedPayload.id) delete sanitizedPayload.id;
  if (sanitizedPayload.uri) delete sanitizedPayload.uri;
  if (sanitizedPayload.uuid) delete sanitizedPayload.uuid;
  return sanitizedPayload;
}

function makePut(hostRoot, resource) {
  return (uuid, payload, config) => {
    const sanitizedPayload = sanitizePayload(payload);

    return fetch(
      `${hostRoot}/${resource}/${uuid}/`,
      _.assign(
        {},
        FETCH_CONFIG,
        {
          credentials: 'include',
          method: 'put',
          body: JSON.stringify(sanitizedPayload),
        },
        config
      )
    );
  };
}

function makeDelete(hostRoot, resource) {
  return (uuid, config) =>
    fetch(
      `${hostRoot}/${resource}/${uuid}/`,
      _.assign(
        {},
        FETCH_CONFIG,
        {
          credentials: 'include',
          method: 'delete',
        },
        config
      )
    );
}

function makePost(hostRoot, resource) {
  return (payload, config) => {
    const sanitizedPayload = sanitizePayload(payload);

    return fetch(
      `${hostRoot}/${resource}/`,
      _.assign(
        {},
        FETCH_CONFIG,
        {
          credentials: 'include',
          method: 'post',
          body: JSON.stringify(sanitizedPayload),
        },
        config
      )
    );
  };
}

function makeGet(hostRoot, resource) {
  return (uuid, config) => {
    let url = uuid;
    if (!uuid.startsWith('http')) {
      url = `${hostRoot}/${resource}/`;
      if (uuid) url += `${uuid}/`;
    }
    return fetch(
      url,
      _.assign(
        {
          credentials: 'include',
        },
        GET_CONFIG,
        config
      )
    );
  };
}

export function doGet(url) {
  return fetch(
    url,
    _.assign({
      credentials: 'include',
      GET_CONFIG,
    })
  );
}

function makeList(hostRoot, resource) {
  return (filters, config) => {
    const query = filtersToQuery(filters) || '';
    const fetchConfig = _.assign(
      {
        credentials: 'include',
      },
      GET_CONFIG,
      config
    );
    return fetch(`${hostRoot}/${resource}/?${query}`, fetchConfig);
  };
}

function makeApi(hostResources) {
  return _.reduce(
    hostResources,
    (result, resources, host) => {
      const hostRoot = Config.HOST[host.toUpperCase()];
      const hostResources = {};
      for (const resource of resources) {
        hostResources[resource] = {
          post: makePost(hostRoot, resource),
          list: makeList(hostRoot, resource),
          delete: makeDelete(hostRoot, resource),
          put: makePut(hostRoot, resource),
          get: makeGet(hostRoot, resource),
        };
      }
      result[host] = hostResources;
      return result;
    },
    {}
  );
}

export const postForm = function(
  url,
  payload,
  files,
  method,
  withCredentials,
  contentType,
  progressCallback
) {
  method = method || 'POST';

  const promise = new Promise((resolve, reject) => {
    const data = new FormData();
    for (var key in payload) {
      if (payload.hasOwnProperty(key)) {
        data.append(key, payload[key]);
      }
    }
    for (var key in files) {
      if (files.hasOwnProperty(key)) {
        data.append(key, files[key], files[key].name);
      }
    }
    const http = new XMLHttpRequest();
    if (http.hasOwnProperty('withCredentials')) {
      http.withCredentials = !!withCredentials;
    }

    const handleProgress = function(e) {
      const percent = Math.floor(e.loaded / e.total * 1000) / 10;
      progressCallback(percent);
    };

    http.addEventListener('progress', handleProgress, false);
    if (http.upload) {
      http.upload.onprogress = handleProgress;
    }

    http.onload = function() {
      resolve(http.responseText);
    };

    http.addEventListener('error', reject, false);
    http.addEventListener('abort', reject, false);

    http.open(method, url, true);
    if (contentType) {
      http.setRequestHeader('Content-Type', contentType);
      http.send(files);
    } else {
      http.send(data);
    }
  });
  return promise;
};

export default makeApi;
