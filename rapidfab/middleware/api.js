function jsonTryParse(text) {
  try {
    return JSON.parse(text || null);
  } catch (error) {
    console.error('Could not parse response as JSON', error);
    return null;
  }
}

function apiMiddleware({ dispatch, getState }) {
  return next => (action) => {
    const {
      api,
      types,
      callApi,
      shouldCallApi = () => true,
      uuid,
      filters,
      payload,
    } = action;

    if (!types) {
      return next(action);
    }

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

    if (!shouldCallApi(getState())) {
      return next(action);
    }

    const [requestType, successType, failureType] = types;

    dispatch({
      api,
      uuid,
      filters,
      payload,
      type: requestType,
    });

    const handleError = (errors) => {
      if (typeof errors === 'object' && errors.message) {
        errors = [{ code: 'api-error', title: errors.message }];
      }
      dispatch({
        api,
        uuid,
        filters,
        errors,
        payload,
        type: failureType,
      });
    };

    const handleResponse = response => response.text().then((text) => {
      const json = jsonTryParse(text);
      if (response.status >= 400) {
        const error = new Error(`Error calling API on ${failureType} response status ${response.status}`, args);
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
      let args = Object.assign({}, {
        api,
        uuid,
        filters,
        payload,
        json,
        headers: {
          location: response.headers.get('Location'),
          uploadLocation: response.headers.get('X-Upload-Location'),
        },
        type: successType,
      });
      dispatch(args);
      return args;
    });

    return callApi().then(handleResponse, handleError);
  };
}

export default apiMiddleware;
