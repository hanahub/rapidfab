import _ from 'lodash';
import { combineReducers } from 'redux';
import { RESOURCES } from 'rapidfab/api';
import { reducer as formReducer } from 'redux-form';

import downloadModel from './downloadModel';
import uploadModel from './uploadModel';
import url from './url';
import locationFilter from './locationFilter';
import orderLocation from './orderLocation';
import i18n from './i18n';
import ui from './ui';
import routeUUID from './routeUUID';
import api from './api';
import resources from './resources';
import pager from './pager';

const Reducer = combineReducers({
  form: formReducer,
  url,
  i18n,
  downloadModel,
  locationFilter,
  orderLocation,
  uploadModel,
  resources,
  api,
  ui,
  routeUUID,
  pager,
});

export default Reducer;
