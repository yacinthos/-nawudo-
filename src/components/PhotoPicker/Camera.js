import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CameraEnchance from '@material-ui/icons/CameraEnhance';
import Webcam from 'react-webcam';
const styles = theme => ({
  root: {
    width: 400
  },
  controls: {
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center'
  }
});

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null
    };
  }
  screenshot = () => {
    const screenshot = this.webcam.getScreenshot();
    this.props.onScreenshot(screenshot);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Webcam
            width={'100%'}
            height={'100%'}
            audio={false}
            ref={node => (this.webcam = node)}
          />
        </div>

        <div className={classes.controls}>
          <IconButton onClick={this.screenshot} aria-label="Capture">
            <CameraEnchance className={classes.playIcon} />
          </IconButton>
        </div>
      </div>
    );
  }
}

Camera.propTypes = {
  classes: PropTypes.object.isRequired,
  onScreenshot: PropTypes.func.isRequired
};

export default withStyles(styles)(Camera);
