// @ts-check
// @flow

export default (text: string = 'Hi from TEST') => {
  const element = document.createElement('button');

  element.innerHTML = text;

  // Trigger lazy-loading of foo.js when cliking the button.
  element.onclick = () => {
    import(/* webpackChunkName: "async-foo" */ './foo')
      .then(foo => {
        element.textContent = `TEST COMPONENT:\n${foo.default()}`;
      })
      .catch(err => {
        console.error(err);
      });
  };

  return element;
};
