import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import apiMiddleware from 'rapidfab/middleware/api';
import Reducer from 'rapidfab/reducers';
import throttle from 'lodash/throttle';

import { loadState, saveState } from '../utils/localStorage';

const loggerMiddleware = createLogger();
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */

export default function initializeStore() {
  const persistedState = loadState();
  const store = createStore(
    Reducer,
    persistedState,
    composeEnhancers(
      applyMiddleware(thunkMiddleware, apiMiddleware, loggerMiddleware)
    )
  );
  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );
  return store;
}
