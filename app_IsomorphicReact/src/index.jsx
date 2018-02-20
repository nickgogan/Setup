// @ts-check

import App from './App';
import ReactDOM from 'react-dom';
import React from 'react';
import getStore from './getStore';
import { Provider, } from 'react-redux';

// const history = createHistory();
// const store = getStore(history);
const store = getStore();

const render = _App => {
  ReactDOM.render(
    <Provider store={store}>
      <_App />
    </Provider>,
    document.getElementById('AppContainer')
  );
};

render(App);

// store.subscribe(() => {
//   const state = store.getState();

//   if (state.questions.length > 0) {
//     render(App);
//   }
// });

// fetchDataForLocation(history.location);

// history.listen(fetchDataForLocation);
