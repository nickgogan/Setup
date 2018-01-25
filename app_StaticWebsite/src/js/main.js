// @ts-check
// @flow

import ConsoleLogHTML from 'console-log-html';
import react from 'react';
import component from './components/test';
// import foo from './components/foo';
import '../styles/main.postcss';

ConsoleLogHTML.connect(document.querySelector('#log'));

class Main {
  constructor(message) {
    console.log(message);
  }
}
document.body.appendChild(component());
const newTest = new Main('Hello from MAIN!');

// TODO: Investigate possibility of using async/await here.
Promise.all([
  import(/* webpackChunkName: "bar" */ './components/bar')
  // import(/* webpackChunkName: "foo" */ './components/foo') // Already imported it via component. Webpack will just use it when the button is clicked.
])
  // .then(([foo, bar]) => {
  //   console.log(`Lazy-loaded modules:\n ${foo.default()}\n${bar.default()}`);
  // })
  .then(([bar]) => {
    console.log(`Lazy-loaded modules:\n${bar.default()}`);
  })
  .catch(e => {
    console.error(e);
  });
