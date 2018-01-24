// @ts-check
// @flow

import ConsoleLogHTML from 'console-log-html';
import foo from './components/foo';
import '../styles/page.postcss';

ConsoleLogHTML.connect(document.querySelector('#log'));

class Page {
  constructor(message) {
    console.log(message);
  }
}

const newTest = new Page('Hello from page!');
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
