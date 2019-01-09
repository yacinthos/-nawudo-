import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import defaultTheme from 'themes/defaultTheme';

class ThemeProvider extends Component {
  getColorTheme() {
    return createMuiTheme(defaultTheme);
  }

  render() {
    let applyTheme = this.getColorTheme();
    return (
      <MuiThemeProvider theme={applyTheme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}
export default ThemeProvider;
