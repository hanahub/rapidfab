import Actions      from "rapidfab/actions"
import Constants    from 'rapidfab/constants';
import { postForm } from "rapidfab/api/makeApi"

function uploadProgress(percent) {
  return {
    type: Constants.UPLOAD_PROGRESS,
    percent: percent,
  }
}

function uploadModel(uploadUrl) {
  return {
    type: Constants.UPLOAD_MODEL,
    uploadUrl: uploadUrl
  }
}

function uploadModelSuccess(modelUri) {
  return {
    type: Constants.UPLOAD_MODEL_SUCCESS,
    modelUri: modelUri,
  }
}

function uploadModelFailure(modelUri) {
  return {
    type: Constants.UPLOAD_MODEL_FAILURE,
    errors: json,
  }
}

export function upload(uploadUrl, model) {
  return dispatch => {
    dispatch(uploadModel(uploadUrl))
    postForm(uploadUrl, {}, model, 'PUT', false, 'application/octet-stream', function (percent) {
      dispatch(uploadProgress(percent))
    })
  }
}
