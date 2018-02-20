import App from './App';
import ReactDOM from 'react-dom';
import React from 'react';

// const history = createHistory();
// const store = getStore(history);

const render = _App => {
  ReactDOM.render(<_App />, document.getElementById('AppContainer'));
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
