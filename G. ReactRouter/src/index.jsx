// @ts-check

// import 'babel-polyfill'; // Use if needed.
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer, } from 'react-hot-loader';

import App from './Screens/Root';

/*
########################################
            Service Worker

Deal with service worker first.
########################################
*/
if (WEBPACK_ENV === 'production') {
  // console.log(`FRONT-END - NODE_ENV: ${process.env.NODE_ENV}`);

  const OfflinePluginRuntime = require('offline-plugin/runtime');
  OfflinePluginRuntime.install({
    onUpdateReady() {
      console.log('[SW] Updated content found.');
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdating: () => {
      console.log('SW Event:', 'onUpdating');
    },
    onUpdated() {
      console.log('[SW] Updated content reloading.');
      window.location.reload();
    },
    onUpdateFailed: () => {
      console.log('SW Event:', 'onUpdateFailed');
    },
  });
} else if (WEBPACK_ENV === 'development') {
  console.log(`WEBPACK_ENV: ${WEBPACK_ENV}`);
  console.log(`FRONT-END - NODE_ENV: ${process.env.NODE_ENV}`);
} else {
  console.log(`FRONT-END - WEBPACK_ENV not seen: ${WEBPACK_ENV}`);
  console.log(`FRONT-END - NODE_ENV: ${process.env.NODE_ENV}`);
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component className='container' />
    </AppContainer>,
    document.getElementById('AppContainer')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./Screens/Root', () => {
    const NextApp = require('./Screens/Root').default;
    render(NextApp);
  });
}

/*
########################################
                Console Output in-site
########################################
*/
// ConsoleLogHTML.connect(document.querySelector('#log'));

// Async load module/component.
// TODO: Investigate possibility of using async/await here.
// Promise.all([import(/* webpackChunkName: "async-bar" */ './components/bar'),])
//   .then(([bar,]) => {
//     console.log(`${bar.default()}`);
//   })
//   .catch(e => {
//     console.error(e);
//   });
