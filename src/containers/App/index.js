import { connect } from 'react-redux';
import {App} from 'components';
import {toggleCollapsedNav} from 'actions/index';
import {withRouter} from 'react-router-dom';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleCollapsedNav: (isNavCollapsed) => {
            dispatch(toggleCollapsedNav(isNavCollapsed));
        }
    };
};
const mapStateToProps = ({settings,routing}) => {
    const {navCollapsed, drawerType,themeColor, sideNavColor} = settings;
    return {navCollapsed, drawerType,themeColor, sideNavColor,routing}
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
