import { createStore, combineReducers, applyMiddleware, } from 'redux';
import { routerReducer as router, routerMiddleware, } from 'react-router-redux';
import { createLogger, } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

export default function(history, defaultState = {}) {
  const middleware = routerMiddleware(history);

  const middlewareChain = [middleware,];

  const store = createStore(
    combineReducers({
      router,
    }),
    defaultState,
    applyMiddleware(...middlewareChain)
  );

  return store;
}
