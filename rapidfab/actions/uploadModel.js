import Constants from 'rapidfab/constants';
import { postForm } from 'rapidfab/api/makeApi';

function uploadProgress(percent) {
  return {
    type: Constants.UPLOAD_MODEL_PROGRESS,
    percent,
  };
}

function uploadModel(uploadUrl) {
  return {
    type: Constants.UPLOAD_MODEL_REQUEST,
    uploadUrl,
  };
}

export function storePayload(payload) {
  return {
    type: Constants.UPLOAD_MODEL_STORE_PAYLOAD,
    payload,
  };
}

export function clearState() {
  return {
    type: Constants.UPLOAD_MODEL_CLEAR,
  };
}

export function upload(uploadUrl, model) {
  return (dispatch) => {
    dispatch(uploadModel(uploadUrl));
    postForm(uploadUrl, {}, model, 'PUT', false, 'application/octet-stream', percent => dispatch(uploadProgress(percent)));
  };
}

export function addError(errors) {
  return {
    type: Constants.UPLOAD_MODEL_ADD_ERROR,
    errors,
  };
}
