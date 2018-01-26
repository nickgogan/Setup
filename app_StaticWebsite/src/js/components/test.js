// @ts-check
// @flow

export default (text = 'Hi from TEST') => {
  const element = document.createElement('button');

  element.innerHTML = text;

  // Trigger lazy-loading of foo.js when cliking the button.
  element.onclick = () => {
    import(/* webpackChunkName: "foo" */ './foo')
      .then(foo => {
        element.textContent = foo.default();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return element;
};
