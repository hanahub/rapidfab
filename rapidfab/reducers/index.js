import _                        from 'lodash'
import { combineReducers }      from 'redux'
import { RESOURCES }            from 'rapidfab/api'
import {reducer as formReducer} from 'redux-form'

import url                      from './url'
import i18n                     from './i18n'
import fakeData                 from './fakeData'
import ui                       from './ui'
import api                      from './api'
import resources                from './resources'

const Reducer = combineReducers({
  form: formReducer,
  url,
  i18n,
  fakeData,
  resources,
  api,
  ui
})

export default Reducer
