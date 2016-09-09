function apiMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      api,
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
      return next(action)
    }

    const [ requestType, successType, failureType ] = types

    dispatch(Object.assign({}, {
      api,
      uuid,
      filters,
      payload,
      type: requestType
    }))

    const handleError = error => {
      dispatch(Object.assign({}, {
        api,
        uuid,
        filters,
        errors: [{ code: "api-error", title: error.message }],
        payload,
        type: failureType
      }))
    }

    const handleResponse = response => response.text().then(text => {
      let json = JSON.parse(text || null)
      let args = Object.assign({}, {
        api,
        uuid,
        filters,
        payload,
        json,
        errors: json.errors,
        headers: {
          location: response.headers.get('Location'),
          uploadLocation: response.headers.get('X-Upload-Location')
        },
        type: response.status >= 400 ? failureType : successType
      })
      dispatch(args)
      if(response.status >= 400) {
        throw new Error(`Error calling API on ${failureType} response status ${response.status}`, args)
      }
      return args
    })

    return callApi().then(handleResponse, handleError)
  }
}

export default apiMiddleware
