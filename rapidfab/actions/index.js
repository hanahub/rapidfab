import Api, { RESOURCES } from 'rapidfab/api'
import { makeApiActions } from './makeApiActions'

import * as DownloadModel from './downloadModel'
import * as EventStream   from './eventStream'
import * as I18n          from './i18n'
import * as UploadModel   from './uploadModel'
import * as Url           from './url'
import * as UI            from './ui'
import * as Pager         from './pager'


const Actions = {
  Api: makeApiActions(Api, RESOURCES),
  DownloadModel,
  EventStream,
  I18n,
  Pager,
  UploadModel,
  Url,
  UI,
}

export default Actions
