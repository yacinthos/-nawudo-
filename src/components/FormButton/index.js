import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import pink from '@material-ui/core/colors/pink';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    wrapper: {
        display:'inline-block',
        position: 'relative',
        marginTop: 12,
        marginLeft: 12,
    },
    buttonProgress: {
        color: pink[500],
        position: 'absolute',
    },
});

class FormButton extends React.Component {
    render() {
        const { loading,disabled,color,classes,...props} = this.props;
        const className='jr-btn text-white '+(disabled?'bg-grey':'bg-'+color);
        return (
                <div className={classes.wrapper}>
                    <Button {...props} disabled={disabled} className={className}>
                        {this.props.children}
                        {loading && <CircularProgress size={30} className={classes.buttonProgress} />}
                    </Button>
                </div>
        );
    }
}

FormButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormButton);
