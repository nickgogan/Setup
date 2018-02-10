// @ts-check
// @flow
// import 'babel-polyfill'; // Only use after verifying you need it.
import ConsoleLogHTML from 'console-log-html';
import react from 'react'; // eslint-disable-line
import component from './components/test';
import '../styles/main.postcss';
import { bake, } from './components/treeshake';

ConsoleLogHTML.connect(document.querySelector('#log'));

if (WEBPACK_ENV === 'production') {
  console.log('MAIN: PROD');
  console.log(`NODE_ENV:${process.env.NODE_ENV}`);

  const OfflinePluginRuntime = require('offline-plugin/runtime');
  OfflinePluginRuntime.install();

  // (function() {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('/service-worker.js');
  //   }
  // })();
} else if (WEBPACK_ENV === 'development') {
  console.log('MAIN: DEV');
  console.log(`NODE_ENV:${process.env.NODE_ENV}`);
} else {
  console.log(`WEBPACK_ENV not seen:${WEBPACK_ENV}`);
  console.log(`NODE_ENV:${process.env.NODE_ENV}`);
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
