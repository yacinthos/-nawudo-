import { connect } from 'react-redux';
import {CardMenu} from 'components';

function mapStateToProps(state) {
    return {
        state: state
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardMenu);

