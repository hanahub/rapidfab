import Api, { RESOURCES } from 'rapidfab/api';
import { makeApiActions } from './makeApiActions';

import * as DownloadModel from './downloadModel';
import * as LocationFilter from './locationFilter';
import * as EventStream from './eventStream';
import * as OrderLocation from './orderLocation';
import * as I18n from './i18n';
import * as UploadModel from './uploadModel';
import * as Url from './url';
import * as UI from './ui';
import * as Pager from './pager';
import * as RouteUUID from './routeUUID';
import * as VolumeUnits from './volumeUnits';

const Actions = {
  Api: makeApiActions(Api, RESOURCES),
  DownloadModel,
  EventStream,
  I18n,
  LocationFilter,
  OrderLocation,
  Pager,
  UploadModel,
  Url,
  UI,
  RouteUUID,
  VolumeUnits,
};

export default Actions;
