// @ts-check
// @flow
import 'babel-polyfill';
import ConsoleLogHTML from 'console-log-html';
import react from 'react'; // eslint-disable-line
// import * as OfflinePlugin from 'offline-plugin/runtime';
import component from './components/test';
import '../styles/main.postcss';
import { bake, } from './components/treeshake';

ConsoleLogHTML.connect(document.querySelector('#log'));

if (WEBPACK_ENV === 'production') {
  console.log('MAIN: PROD');

  const runtime = require('offline-plugin/runtime');
  runtime.install();

  // (function() {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('/service-worker.js');
  //   }
  // })();
} else {
  console.log('MAIN: DEV');
}

class Main {
  constructor(message) {
    console.log(message);
  }
}
const newTest = new Main('MAIN: BABEL WORKING');
bake();
document.body.appendChild(component());

// TODO: Investigate possibility of using async/await here.
Promise.all([import(/* webpackChunkName: "async-bar" */ './components/bar'),])
  .then(([bar,]) => {
    console.log(`${bar.default()}`);
  })
  .catch(e => {
    console.error(e);
  });
