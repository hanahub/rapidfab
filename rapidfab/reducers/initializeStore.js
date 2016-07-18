import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import Reducer from 'rapidfab/reducers'


const loggerMiddleware = createLogger()

export default function initializeStore(initialState) {
  return createStore(
    Reducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}

export default initializeStore
