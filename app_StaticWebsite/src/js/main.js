// @ts-check
// @flow

import ConsoleLogHTML from 'console-log-html';
import react from 'react'; // eslint-disable-line
import component from './components/test';
import '../styles/main.postcss';
import { bake, } from './components/treeshake';

ConsoleLogHTML.connect(document.querySelector('#log'));

bake();
class Main {
  constructor(message) {
    console.log(message);
  }
}
document.body.appendChild(component());
const newTest = new Main('Hello from MAIN!');

// TODO: Investigate possibility of using async/await here.
Promise.all([import(/* webpackChunkName: "async-bar" */ './components/bar'),])
  .then(([bar,]) => {
    console.log(`Lazy-loaded modules:\n${bar.default()}`);
  })
  .catch(e => {
    console.error(e);
  });
