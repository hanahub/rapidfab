import { combineReducers } from 'redux'

import url from './url'
import i18n from './i18n'
import orders from './orders'


const Reducer = combineReducers({
  url,
  i18n,
  orders
})

export default Reducer
