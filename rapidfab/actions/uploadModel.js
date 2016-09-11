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

function uploadModelSuccess() {
  return {
    type: Constants.UPLOAD_MODEL_SUCCESS,
  }
}

function uploadModelFailure(errors) {
  return {
    type: Constants.UPLOAD_MODEL_FAILURE,
    errors: errors,
  }
}

export function upload(uploadUrl, model) {
  return dispatch => {
    dispatch(uploadModel(uploadUrl))
    postForm(uploadUrl, {}, model, 'PUT', false, 'application/octet-stream', function (percent) {
      dispatch(uploadProgress(percent)).then( args => uploadModelSuccess(), uploadModelFailure(args.errors))
    })
  }
}
