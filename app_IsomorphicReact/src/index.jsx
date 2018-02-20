// @ts-check

import App from './App';
import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer, } from 'react-hot-loader';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component test='TEST' />
    </AppContainer>,
    document.getElementById('AppContainer')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
