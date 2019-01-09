import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Config } from 'constants/ColorThemes';
import { COLLAPSED_DRAWER, FIXED_DRAWER } from 'constants/ActionTypes';
import PropTypes from 'prop-types';

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: $(window).width()
    };
  }
  onToggleCollapsedNav = e => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  componentDidMount() {
    const { history } = this.props;
    const $body = $('#body');

    if (Config.autoCloseMobileNav) {
      history.listen(location => {
        setTimeout(() => {
          $body.removeClass('sidebar-mobile-open');
        }, 0);
      });
    }
    window.addEventListener('resize', () => {
      this.setState({ width: $(window).width() });
    });
  }

  render() {
    const { navCollapsed, drawerType } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? 'd-xl-flex'
      : drawerType.includes(COLLAPSED_DRAWER)
        ? ''
        : 'd-flex';
    let type = 'permanent';
    if (
      drawerType.includes(COLLAPSED_DRAWER) ||
      (drawerType.includes(FIXED_DRAWER) && this.state.width < 1200)
    ) {
      type = 'temporary';
    }

    return (
      <div className={`app-sidebar d-none ${drawerStyle}`}>
        <Drawer
          className="app-sidebar-content"
          variant={type}
          open={type.includes('temporary') ? navCollapsed : true}
          onClose={this.onToggleCollapsedNav.bind(this)}
          classes={{
            paper: 'side-nav'
          }}
        >
          {this.props.userInfo}
          {this.props.navContent}
        </Drawer>
      </div>
    );
  }
}

SideNav.propTypes = {
  userInfo: PropTypes.object.isRequired,
  navContent: PropTypes.object.isRequired
};
export default SideNav;
