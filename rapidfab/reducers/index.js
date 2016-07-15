import { combineReducers } from 'redux'

import url from './url'
import i18n from './i18n'


const Reducer = combineReducers({
  url,
  i18n
})

export default Reducer
