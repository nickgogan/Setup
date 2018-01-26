// @ts-check
// @flow

import ConsoleLogHTML from 'console-log-html';
import 'react'; // eslint-disable-line
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
Promise.all([
  import(/* webpackChunkName: "bar" */ './components/bar'),
  // import(/* webpackChunkName: "foo" */ './components/foo') // Already imported it via component. Webpack will just use it when the button is clicked.
])
  // .then(([foo, bar]) => {
  //   console.log(`Lazy-loaded modules:\n ${foo.default()}\n${bar.default()}`);
  // })
  .then(([bar,]) => {
    console.log(`Lazy-loaded modules:\n${bar.default()}`);
  })
  .catch(e => {
    console.error(e);
  });
