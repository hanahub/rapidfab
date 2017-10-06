import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import api from './api';
import downloadModel from './downloadModel';
import i18n from './i18n';
import locationFilter from './locationFilter';
import orderLocation from './orderLocation';
import pager from './pager';
import routeUUID from './routeUUID';
import resources from './resources';
import uploadModel from './uploadModel';
import url from './url';
import ui from './ui';

const Reducer = combineReducers({
  api,
  downloadModel,
  form: formReducer,
  i18n,
  locationFilter,
  orderLocation,
  pager,
  resources,
  routeUUID,
  ui,
  uploadModel,
  url,
});

export default Reducer;
