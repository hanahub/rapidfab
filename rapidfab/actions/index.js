import Api, { RESOURCES } from 'rapidfab/api';
import { makeApiActions } from './makeApiActions'

import * as Url from './url'
import * as I18n from './i18n'

const Actions = {
  Url,
  I18n,
  Api: makeApiActions(Api, RESOURCES)
}

export default Actions
