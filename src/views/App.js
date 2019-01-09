import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from 'routes/index';

class App extends Component {
  render() {
    return <Switch>{renderRoutes(routes)}</Switch>;
  }
}
export default App;
