import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './storage';
import AppStore from './AppStore';
const rootEl = document.getElementById('app-site');
// Create a reusable render method that we can call more than once
let render = () => {
  // Dynamically import our main App component, and render it
  //const App = require('./containers/App').default;
  const App = require('views/App').default;

  ReactDOM.render(
    <AppStore>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </AppStore>,
    rootEl
  );
};

if (module.hot) {
  // Support hot reloading of components.
  // Whenever the App component file or one of its dependencies
  // is changed, re-import the updated component and re-render it
  module.hot.accept('views/App', () => {
    setTimeout(render);
  });
}
render();
