// @ts-check
// import 'babel-polyfill'; // Only use after verifying you need it.
import * as React from 'react';
import ReactDOM from 'react-dom';

import ConsoleLogHTML from 'console-log-html';
import App from './components/appShell/app';
// import 'favicon.png';

/*
########################################
                    Service Worker

Deal with service worker first.
########################################
*/

if (WEBPACK_ENV === 'production') {
  // eslint-disable-line
  console.log('MAIN: PROD');
  console.log(`NODE_ENV:${process.env.NODE_ENV}`);

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
  console.log('MAIN: DEV');
  console.log(`NODE_ENV:${process.env.NODE_ENV}`);
} else {
  console.log(`WEBPACK_ENV not seen:${WEBPACK_ENV}`);
  console.log(`NODE_ENV:${process.env.NODE_ENV}`);
}

/*
########################################
                        App Shell
########################################
*/

ReactDOM.render(<App foo='Hello React' />, document.getElementById('app'));

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
