// @ts-check

import { createStore, combineReducers, applyMiddleware, } from 'redux';
import { identity, } from 'lodash';
import { createLogger, } from 'redux-logger';

export default function(
  defaultState = {
    test: 'TEST',
  }
) {
  const middlewareChain = [];
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewareChain.push(logger);
  }
  const store = createStore(
    identity,
    defaultState,
    applyMiddleware(...middlewareChain)
  );
  return store;
}
