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
          `${formattedFilters}${
            formattedFilters.length ? '&' : ''
          }filter[${filterKey}]=${encodeURIComponent(filters[filterKey])}`,
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
  return (uuid, config) => {
    const url = uuid
      ? `${hostRoot}/${resource}/${uuid}/`
      : `${hostRoot}/${resource}/`;
    return fetch(
      url,
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
  };
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

export function postForm(
  url,
  payload,
  files,
  method = 'POST',
  withCredentials,
  contentType,
  progressCallback
) {
  const promise = new Promise((resolve, reject) => {
    const data = new FormData();
    Object.keys(payload).forEach(key => {
      data.append(key, payload[key]);
    });
    Object.keys(files).forEach(key => {
      data.append(key, files[key], files[key].name);
    });
    const http = new XMLHttpRequest();
    if (Object.prototype.hasOwnProperty.call(http, 'withCredentials')) {
      http.withCredentials = !!withCredentials;
    }

    const handleProgress = e => {
      const percent = Math.floor(e.loaded / e.total * 1000) / 10;
      progressCallback(percent);
    };

    http.addEventListener('progress', handleProgress, false);
    if (http.upload) {
      http.upload.onprogress = handleProgress;
    }

    http.onload = () => {
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
}

const makeApi = api =>
  Object.keys(api).reduce((hosts, host) => {
    const hostRoot = Config.HOST[host.toUpperCase()];
    return Object.assign({}, hosts, {
      [host]: api[host].reduce(
        (resources, resource) =>
          Object.assign({}, resources, {
            [resource]: {
              post: makePost(hostRoot, resource),
              list: makeList(hostRoot, resource),
              delete: makeDelete(hostRoot, resource),
              put: makePut(hostRoot, resource),
              get: makeGet(hostRoot, resource),
            },
          }),
        {}
      ),
    });
  }, {});

export default makeApi;
