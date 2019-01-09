import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {SideNav} from 'components';
import {toggleCollapsedNav} from 'actions/index';

function mapStateToProps({settings,router}) {
    const {navCollapsed, drawerType} = settings;
    const location=router.location;
    return {
        navCollapsed,
        drawerType,
        location
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleCollapsedNav: (isNavCollapsed) => {
            dispatch(toggleCollapsedNav(isNavCollapsed));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNav));

