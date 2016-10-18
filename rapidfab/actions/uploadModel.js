import Actions      from "rapidfab/actions"
import Constants    from 'rapidfab/constants';
import { postForm } from "rapidfab/api/makeApi"

function uploadProgress(percent) {
  return {
    type: Constants.UPLOAD_MODEL_PROGRESS,
    percent: percent,
  }
}

function uploadModel(uploadUrl) {
  return {
    type: Constants.UPLOAD_MODEL_REQUEST,
    uploadUrl: uploadUrl,
  }
}

export function storeOrderPayload(payload) {
  return {
    type: Constants.UPLOAD_MODEL_STORE_ORDER_PAYLOAD,
    payload,
  }
}

export function clearState(payload) {
  return {
    type: UPLOAD_MODEL_CLEAR,
  }
}

export function upload(uploadUrl, model) {
  return dispatch => {
    dispatch(uploadModel(uploadUrl))
    postForm(uploadUrl, {}, model, 'PUT', false, 'application/octet-stream', percent => dispatch(uploadProgress(percent)))
  }
}
