// @ts-check
// @flow

import ConsoleLogHTML from 'console-log-html';
import foo from './components/foo';
import '../styles/main.postcss';

ConsoleLogHTML.connect(document.querySelector('#log'));

class Main {
  constructor(message) {
    console.log(message);
  }
}

const newTest = new Main('Hello from MAIN!');
console.log(foo());

// TODO: Investigate possibility of using async/await here.
// Promise.all([
//   import(/* webpackChunkName: "foo" */ './components/foo'),
//   import(/* webpackChunkName: "bar" */ './components/bar')
// ])
//   .then(([{ Foo }, { Bar }]) => {
//     console.log(`Lazy-loaded modules:${  Foo()}`); // , Bar: ${Bar()}`);
//   })
//   .catch(e => {
//     console.error(e);
//   });
