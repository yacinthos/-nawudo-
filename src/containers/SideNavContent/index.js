import {connect } from 'react-redux';
import {SideNavContent} from 'components';
import {withRouter} from 'react-router-dom';
function mapStateToProps(state) {
    return {
        state
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNavContent));
