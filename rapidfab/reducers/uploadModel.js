import _                  from 'lodash'
import Constants          from 'rapidfab/constants'
import { extractUuid }    from 'rapidfab/reducers/makeApiReducers'

export const initialState = {
  uploadLocation: null,
  uploading: false,
  percent: 0,
  processingModelUuid: null,
  orderPayload: null,
}

function reducer(state=initialState, action) {
  switch (action.type) {
    case Constants.RESOURCE_POST_SUCCESS:
      if(action.api.resource === "model") {
        return Object.assign({}, state, {
          modelUuid: extractUuid(action.headers.location)
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
    case Constants.UPLOAD_MODEL_STORE_ORDER_PAYLOAD:
      return Object.assign({}, state, {
        orderPayload: action.payload
      })
    case Constants.UPLOAD_MODEL_CLEAR:
      return initialState
    default:
      return state
  }
}

export default reducer
