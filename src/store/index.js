import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { createLogicMiddleware } from 'redux-logic';
import thunk from 'redux-thunk';
import loger from 'redux-logger';
import * as actionCreators from 'actions';
import reducers from '../reducers/index';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
};

export default function configureStore(initialState = {}, history) {
  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    actionCreators
  });

  const injectedHelpers = {};
  const logicMiddleware = createLogicMiddleware([], injectedHelpers);

  const middleware = [logicMiddleware, routerMiddleware(history), thunk, loger];
  const enhancers = [applyMiddleware(...middleware)];

  const store = createStore(
    persistReducer(persistConfig, connectRouter(history)(reducers)),
    initialState,
    composeEnhancers(...enhancers)
  );

  /*if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer)
        });
    }*/

  // Extensions
  store.logicMiddleware = logicMiddleware;
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('../reducers/index', () => {
      import('../reducers/index').then(reducerModule => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }
  return store;
}
