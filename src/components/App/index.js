import React, { Component } from 'react';
import { isIOS, isMobile } from 'react-device-detect';
import { COLLAPSED_DRAWER, FIXED_DRAWER } from 'constants/ActionTypes';
import 'react-big-calendar/lib/less/styles.less';
import 'styles/bootstrap.scss';
import 'styles/app.scss';
import ThemeProvider from 'components/ThemeProvider/index';
class App extends Component {
  render() {
    const { themeColor, drawerType } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? 'fixed-drawer'
      : drawerType.includes(COLLAPSED_DRAWER)
        ? 'collapsible-drawer'
        : 'mini-drawer';
    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      $('#body').addClass('ios-mobile-view-height');
    } else if ($('#body').hasClass('ios-mobile-view-height')) {
      $('#body').removeClass('ios-mobile-view-height');
    }
    return (
      <ThemeProvider>
        <div className="app-main">
          <div className={`app-container ${drawerStyle}`}>
            {this.props.children}
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
export default App;
