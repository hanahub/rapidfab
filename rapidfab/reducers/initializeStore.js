import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import apiMiddleware from 'rapidfab/middleware/api';
import Reducer from 'rapidfab/reducers';


const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function initializeStore(initialState) {
  return createStore(
    Reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        apiMiddleware,
        loggerMiddleware,
      ),
    ),
  );
}
