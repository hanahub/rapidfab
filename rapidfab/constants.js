function make_constants(constants) {
  let result = {};
  for(let i = 0; i < constants.length; i++) {
    let constant = constants[i];
    result[constant] = constant;
  }
  return result;
}

const Constants = [
  'DOWNLOAD_MODEL_CONTENT',
  'DOWNLOAD_MODEL_REQUEST',
  'DOWNLOAD_MODEL_SUCCESS',
  'DOWNLOAD_MODEL_FAILURE',
  'HASH_CHANGE',
  'LOCALE_CHANGE',
  'EVENT_STREAM_MESSAGE',
  'RESOURCE_POST_REQUEST',
  'RESOURCE_POST_SUCCESS',
  'RESOURCE_POST_FAILURE',
  'RESOURCE_PUT_REQUEST',
  'RESOURCE_PUT_SUCCESS',
  'RESOURCE_PUT_FAILURE',
  'RESOURCE_LIST_REQUEST',
  'RESOURCE_LIST_SUCCESS',
  'RESOURCE_LIST_FAILURE',
  'RESOURCE_GET_REQUEST',
  'RESOURCE_GET_SUCCESS',
  'RESOURCE_GET_FAILURE',
  'RESOURCE_DELETE_REQUEST',
  'RESOURCE_DELETE_SUCCESS',
  'RESOURCE_DELETE_FAILURE',
  'RESOURCE_MANUAL_REMOVE',
  'UPLOAD_MODEL_STORE_ORDER_PAYLOAD',
  'UPLOAD_MODEL_CLEAR',
  'UPLOAD_MODEL_PROGRESS',
  'UPLOAD_MODEL_REQUEST',
  'UPLOAD_MODEL_FAILURE',
  'UPLOAD_MODEL_SUCCESS',
  'UPLOAD_MODEL_ADD_ERROR',
  'SET_PAGE',
  'CLEAR_UI_STATE',
]

export const Currencies = [
  'USD', 'GBP', 'JPY', 'EUR',
]

export const MODELER_STATUS_MAP = {
  idle: {
    status: "info",
    message: "The modeler is idle",
  },
  offline: {
    status: "warning",
    message: "The modeler is offline",
  },
  error: {
    status: "danger",
    message: "The modeler is in error",
  },
  printing: {
    status: "success",
    message: "The modeler is printing",
  },
  unknown: {
    status: "unknown",
    message: "The modeler could not be found",
  },
}

export const ORDER_STATUS_MAP = {
  calculating_estimates: "calculating estimates",
  "post-processing"    : "post processing",
}

export const RUN_STATUS_MAP = {
  "in-progress": "in progress",
}

export default make_constants(Constants)
