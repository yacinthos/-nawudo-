import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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
    flexGrow: 1,
    zIndex: 2000
  },
  grow: {
    flexGrow: 1
  }
};
class ResponsiveDialog extends React.Component {
  state = {
    open: true
  };
  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };
  render() {
    const { title, classes, children, dialogProps } = this.props;

    return (
      <Dialog
        className={classes.root}
        open={this.state.open}
        {...dialogProps}
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
    );
  }
}

ResponsiveDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.any.isRequired
};
export default withMobileDialog()(withStyles(styles)(ResponsiveDialog));
