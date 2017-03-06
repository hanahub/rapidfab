import Actions          from "rapidfab/actions"
import Constants        from 'rapidfab/constants';
import { doGet }        from 'rapidfab/api/makeApi'

export function fetchModel(downloadURL) {
  return {
    types: [
      'DOWNLOAD_MODEL_REQUEST',
      'DOWNLOAD_MODEL_SUCESS',
      'DOWNLOAD_MODEL_FAILURE',
    ],
    callApi: () => {
      return doGet(downloadURL);
    }
  }
}

export function downloadContent(filename, contentURL) {
  var withFilename = `${contentURL}&filename=${filename}`;
  window.location = withFilename;
  return {
    type: Constants.DOWNLOAD_MODEL_CONTENT,
    url: contentURL,
  };
}
