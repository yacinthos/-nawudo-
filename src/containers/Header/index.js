import { connect } from 'react-redux';
import {Header} from 'components';
import {toggleCollapsedNav} from 'actions/index';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleCollapsedNav: (isNavCollapsed) => {
            dispatch(toggleCollapsedNav(isNavCollapsed));
        }
    };
};
const mapStateToProps = ({settings}) => {
    const {navCollapsed, drawerType} = settings;
    return {navCollapsed, drawerType}
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
