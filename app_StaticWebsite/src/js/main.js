// @ts-check
// @flow
// import 'babel-polyfill'; // Only use after verifying you need it.
import ConsoleLogHTML from 'console-log-html';
import * as React from 'react';
import ReactDOM from 'react-dom';
import component from './components/test';
import '../styles/main.postcss';
import { bake, } from './components/treeshake';
import App from '../components/app';

// Showcase console messages in-browser.
ConsoleLogHTML.connect(document.querySelector('#log'));

ReactDOM.render(<App foo='Hello React' />, document.getElementById('app'));

/*
########################################
                    Service Worker
########################################
*/
if (WEBPACK_ENV === 'production') {
  // eslint-disable-line
  console.log('MAIN: PROD');
  console.log(`NODE_ENV:${process.env.NODE_ENV}`);

  const OfflinePluginRuntime = require('offline-plugin/runtime');
  OfflinePluginRuntime.install({
    minify: true,
    onUpdateReady() {
      console.log('[SW] Updated content found.');
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated() {
      console.log('[SW] Updated content reloading.');
      window.location.reload();
    },
  });
} else if (WEBPACK_ENV === 'development') {
  console.log('MAIN: DEV');
  console.log(`NODE_ENV:${process.env.NODE_ENV}`);
} else {
  console.log(`WEBPACK_ENV not seen:${WEBPACK_ENV}`);
  console.log(`NODE_ENV:${process.env.NODE_ENV}`);
}
// Test - Babel
class Main {
  constructor(message) {
    console.log(message);
  }
}
const newTest = new Main('MAIN: BABEL WORKING');

// Test - Tree shaking
bake();

// Lazy-load module/component.
document.body.appendChild(component());

// Async load module/component.
// TODO: Investigate possibility of using async/await here.
Promise.all([import(/* webpackChunkName: "async-bar" */ './components/bar'),])
  .then(([bar,]) => {
    console.log(`${bar.default()}`);
  })
  .catch(e => {
    console.error(e);
  });
