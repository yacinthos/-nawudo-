import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({});

class InfoPopper extends React.Component {
  state = {
    anchorEl: null,
    open: false
  };
  render() {
    const { classes, children, toggleContent } = this.props;
    const open = Boolean(this.state.anchorEl);
    const id = open ? 'render-props-popper' : null;
    return (
      <React.Fragment>
        <div className={classes.container}>
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={event => {
              this.setState({
                anchorEl: event.currentTarget,
                open: !this.state.open
              });
            }}
          >
            {toggleContent}
          </Button>
          <Popper
            id={id}
            open={this.state.open}
            className={classes.up}
            anchorEl={this.state.anchorEl}
            //placement="bottom"
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>{children}</Paper>
              </Fade>
            )}
          </Popper>
        </div>
      </React.Fragment>
    );
  }
}

InfoPopper.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleContent: PropTypes.any.isRequired,
  children: PropTypes.element.isRequired
};

export default withStyles(styles)(InfoPopper);
