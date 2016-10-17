import _                  from 'lodash'
import Constants          from 'rapidfab/constants'
import { extractUuid }    from 'rapidfab/reducers/makeApiReducers'

export const initialState = {
  uploadLocation: null,
  uploading: false,
  percent: 0,
  processingModel: null,
}

function processingModelReducer(state, action) {
  return Object.assign({}, state, {
    uuid            : extractUuid(action.headers.location),
    uri             : action.headers.location,
    uploadLocation  : action.headers.uploadLocation,
  })
}

function reducer(state=initialState, action) {
  switch (action.type) {
    case Constants.RESOURCE_POST_SUCCESS:
      if(action.api.resource === "model") {
        return Object.assign({}, state, {
          processingModel: processingModelReducer(state.processingModel, action)
        })
      }
      return state
    case Constants.UPLOAD_MODEL_REQUEST:
      return Object.assign({}, state, {
        uploadLocation: action.uploadUrl,
        uploading: true,
        percent: 0,
      })
    case Constants.UPLOAD_MODEL_PROGRESS:
      return Object.assign({}, state, {
        uploading: true,
        percent: action.percent,
      })
    default:
      return state
  }
}

export default reducer
