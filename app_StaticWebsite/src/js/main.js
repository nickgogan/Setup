// @ts-check
// @flow
// import 'babel-polyfill'; // Only use after verifying you need it.
import ConsoleLogHTML from 'console-log-html';
import react from 'react'; // eslint-disable-line
import component from './components/test';
import '../styles/main.postcss';
import { bake, } from './components/treeshake';

// Showcase console messages.
ConsoleLogHTML.connect(document.querySelector('#log'));

/*
########################################
                    Service Worker
########################################
*/
if (WEBPACK_ENV === 'production') {
  console.log('MAIN: PROD');
  console.log(`NODE_ENV:${process.env.NODE_ENV}`);

  const OfflinePluginRuntime = require('offline-plugin/runtime');
  OfflinePluginRuntime.install({
    onUpdateReady() {
      console.log('[SW] Updated content found.');
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated() {
      console.log('[SW] Updated content reloading.');
      window.location.reload();
    },
  });

  // (function() {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('/service-worker.js');
  //   }
  // })();

  // FROM GOOGLE
  // if ('serviceWorker' in navigator) {
  //   // Your service-worker.js *must* be located at the top-level directory relative to your site.
  //   // It won't be able to control pages unless it's located at the same level or higher than them.
  //   // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
  //   // See https://github.com/slightlyoff/ServiceWorker/issues/468
  //   navigator.serviceWorker
  //     .register('service-worker.js')
  //     .then(reg => {
  //       // updatefound is fired if service-worker.js changes.
  //       reg.onupdatefound = function() {
  //         // The updatefound event implies that reg.installing is set; see
  //         // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
  //         const installingWorker = reg.installing;

  //         installingWorker.onstatechange = function() {
  //           console.log('ServiceWorker state change.');
  //           switch (installingWorker.state) {
  //             case 'installed':
  //               if (navigator.serviceWorker.controller) {
  //                 // At this point, the old content will have been purged and the fresh content will
  //                 // have been added to the cache.
  //                 // It's the perfect time to display a "New content is available; please refresh."
  //                 // message in the page's interface.
  //                 console.log('New or updated content is available.');
  //               } else {
  //                 // At this point, everything has been precached.
  //                 // It's the perfect time to display a "Content is cached for offline use." message.
  //                 console.log('Content is now available offline!');
  //               }
  //               break;

  //             case 'redundant':
  //               console.error(
  //                 'The installing service worker became redundant.'
  //               );
  //               break;
  //           }
  //         };
  //       };
  //     })
  //     .catch(e => {
  //       console.error('Error during service worker registration:', e);
  //     });
  // }
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
