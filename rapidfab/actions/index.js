import Api, { RESOURCES } from 'rapidfab/api'
import { makeApiActions } from './makeApiActions'

import * as EventStream   from './eventStream'
import * as I18n from './i18n'
import * as Url from './url'

const Actions = {
  Api: makeApiActions(Api, RESOURCES),
  EventStream,
  I18n,
  Url
}

export default Actions
