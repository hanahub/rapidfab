import _                   from 'lodash'
import { combineReducers } from 'redux'
import { makeApiReducers } from './makeApiReducers'
import { RESOURCES }       from 'rapidfab/api'
import {reducer as formReducer} from 'redux-form';

import url from './url'
import i18n from './i18n'
import orders from './orders'

const Reducer = combineReducers(_.assign({
  form: formReducer,
  url,
  i18n,
  orders,
}, makeApiReducers(RESOURCES)))

export default Reducer
