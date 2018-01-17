// @ts-check
// @flow

import ConsoleLogHTML from 'console-log-html';
import test from './test.js';

ConsoleLogHTML.connect(document.querySelector('#log'));
console.log(console.log(`~~~~~~~~~~~~~~~~~~~~\n\tWebpack compiled ${test()}\n~~~~~~~~~~~~~~~~~~~~`);)

// TODO: Investigate possibility of using async/await here.
Promise.all([
  import(/* webpackChunkName: "foo" */ './foo'),
  import(/* webpackChunkName: "bar" */ './bar')
])
  .then(([{ Foo }, { Bar }]) => {
    console.log('Lazy-loaded modules ', Foo(), Bar());
  })
  .catch(e => {
    console.error(e);
  });
