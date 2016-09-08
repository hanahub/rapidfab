import _                        from 'lodash'
import { combineReducers }      from 'redux'
import { RESOURCES }            from 'rapidfab/api'
import {reducer as formReducer} from 'redux-form'

import uploadModel              from './uploadModel'
import url                      from './url'
import i18n                     from './i18n'
import fakeData                 from './fakeData'
import { makeApiReducers }      from './makeApiReducers'

const Reducer = combineReducers(_.assign({
  form: formReducer,
  url,
  i18n,
  uploadModel,
  fakeData,
}, makeApiReducers(RESOURCES)))

export default Reducer
