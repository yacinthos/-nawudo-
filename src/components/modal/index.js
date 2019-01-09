import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconClear from '@material-ui/icons/Clear';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

class ResponsiveDialog extends React.Component {
  static defaultProps = {
    title: ''
  };
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      fullScreen,
      title,
      component,
      classes,
      children,
      ...props
    } = this.props;

    return (
      <div>
        <span onClick={this.handleClickOpen}>{component}</span>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          {...props}
          onClose={this.handleClose}
        >
          <DialogTitle>
            <Paper>
              <Toolbar variant="dense">
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.grow}
                >
                  {title}
                </Typography>
                <IconButton
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Clear"
                >
                  <IconClear />
                </IconButton>
              </Toolbar>
            </Paper>
          </DialogTitle>
          <DialogContent>{children}</DialogContent>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  component: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.any.isRequired
};

export default withMobileDialog()(withStyles(styles)(ResponsiveDialog));
