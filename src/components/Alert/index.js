import React from 'react';
import {UncontrolledAlert} from 'reactstrap';
import IconError from '@material-ui/icons/Error';
import IconCheck from '@material-ui/icons/Check';
import PropTypes from 'prop-types';

class Alert extends React.Component {
    render() {
        return (
            <UncontrolledAlert className={this.props.type==='error'?'alert-addon-card bg-danger bg-danger text-white shadow-lg':'alert-addon-card bg-success bg-success text-white shadow-lg'}>
                        <span className="icon-addon alert-addon">
                            {this.props.type==='error'?<IconError/>:<IconCheck/>}
                        </span>
                <span className="d-inline-block">{this.props.message}</span>
            </UncontrolledAlert>
        );
    }

}
Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type:PropTypes.string.isRequired
};
export default Alert;
