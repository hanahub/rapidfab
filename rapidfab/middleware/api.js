function apiMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callApi,
      shouldCallApi = () => true,
      uuid,
      filters,
      payload
    } = action

    if (!types) {
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
        !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callApi !== 'function') {
      throw new Error('Expected fetch to be a function.')
    }

    if (!shouldCallApi(getState())) {
      return
    }

    const [ requestType, successType, failureType ] = types

    dispatch(Object.assign({}, {
      uuid,
      filters,
      payload,
      type: requestType
    }))

    const handleError = error => dispatch(Object.assign({}, {
      uuid,
      filters,
      error,
      payload,
      type: failureType
    }))

    const handleResponse = response => response.text().then(text => {
      let json = JSON.parse(text || null)
      if(response.status >= 400) {
        dispatch(Object.assign({}, {
          uuid,
          filters,
          payload,
          json,
          headers: null,
          type: failureType
        }))
      } else {
        dispatch(Object.assign({}, {
          uuid,
          filters,
          payload,
          json,
          headers: {
            location: response.headers.get('Location')
          },
          type: successType
        }))
      }
    })

    return callApi().then(handleResponse, handleError)
  }
}

export default apiMiddleware
