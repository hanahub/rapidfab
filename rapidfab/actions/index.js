import Api, { RESOURCES } from 'rapidfab/api';
import { makeApiActions } from './makeApiActions'

import * as UploadModel from './uploadModel'
import * as Url from './url'
import * as I18n from './i18n'

const Actions = {
  Url,
  I18n,
  UploadModel,
  Api: makeApiActions(Api, RESOURCES)
}

export default Actions
