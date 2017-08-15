import 'babel-polyfill';
import 'font-awesome-webpack';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import Config from 'rapidfab/config';
import Raven from 'raven-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'rapidfab/styles/main.less';
import 'rapidfab/styles/flags.less';
import initializeStore from 'rapidfab/reducers/initializeStore';
import AppContainer from 'rapidfab/containers/app';
import '../node_modules/fullcalendar/dist/fullcalendar.css';
import '../node_modules/fullcalendar-scheduler/dist/scheduler.css';

if (Config.SENTRY_DSN) {
  Raven.config(Config.SENTRY_DSN, { fetchContext: true }).install();
  console.log('Raven integration installed');
}

const App = ({ store }) => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

ReactDOM.render(
  <App store={initializeStore()} />,
  document.getElementById('app'),
);

export default App;
