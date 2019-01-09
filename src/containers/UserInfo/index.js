import {connect } from 'react-redux';
import {UserInfo} from 'components';
import {userLogout} from 'actions';

function mapStateToProps(state) {
    return {
        state: state
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userLogout: () => {
            dispatch(userLogout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
