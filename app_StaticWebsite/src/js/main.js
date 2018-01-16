// @ts-check
// @flow
import ConsoleLogHTML from 'console-log-html';

Promise.all([
  import(/* webpackChunkName: "foo" */ './foo'),
  import(/* webpackChunkName: "bar" */ './bar')
])
  .then(([{ Foo }, { Bar }]) => {
    console.log('Lazy-loaded modules exports ', Foo(), Bar());
  })
  .catch(e => {
    console.error(e);
  });
