import Constants from 'rapidfab/constants';
import Raven from 'raven-js';

function jsonTryParse(text) {
  try {
    return JSON.parse(text || null);
  } catch (error) {
    return null;
  }
}

function apiMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      api,
      callApi,
      filters,
      payload,
      shouldCallAPI = () => true,
      types,
      uuid,
    } = action;
    if (!types) {
      return next(action);
    }

    const [requestType, successType, failureType] = types;
    const createAPIAction = updates =>
      Object.assign(
        {
          api,
          filters,
          uuid,
          payload,
          type: successType,
        },
        updates
      );

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callApi !== 'function') {
      throw new Error('Expected fetch to be a function.');
    }

    const state = getState();
    if (!shouldCallAPI(state)) {
      return new Promise(resolve => {
        resolve(
          next(
            createAPIAction({
              type: Constants.RESOURCE_REQUEST_SUPPRESSED,
            })
          )
        );
      });
    }

    dispatch(
      createAPIAction({
        type: requestType,
      })
    );

    const handleError = errors => {
      let sanitizedErrors = null;
      const failedToFetch = errors.message === 'Failed to fetch';
      if (typeof errors === 'object' && errors.message) {
        const errorMessage = failedToFetch
          ? 'An unknown error has occurred'
          : errors.message;
        sanitizedErrors = [{ code: 'api-error', title: errorMessage }];
      }
      dispatch(
        createAPIAction({
          errors: sanitizedErrors || errors,
          type: failureType,
        })
      );
      if (failedToFetch) {
        Raven.captureException(new Error('Failed to fetch'), {
          extra: { api, uuid, filters, errors, payload },
        });
      }
    };

    const handleResponse = response =>
      response.text().then(text => {
        const json = jsonTryParse(text);
        if (response.status >= 400) {
          const error = new Error(
            `Error calling API on ${failureType} response status ${response.status}`,
            createAPIAction({})
          );
          if (json && json.errors && json.errors.length) {
            handleError(json.errors);
          } else {
            handleError(error);
          }
          throw error;
        }
        if (text && !json) {
          const error = new Error('Could not parse response', text);
          handleError(error);
          throw error;
        }
        return dispatch(
          createAPIAction({
            json,
            headers: {
              location: response.headers.get('Location'),
              uploadLocation: response.headers.get('X-Upload-Location'),
            },
            type: successType,
          })
        );
      });

    return callApi().then(handleResponse, handleError);
  };
}

export default apiMiddleware;
