import React, { Component } from 'react';
import { Dialog } from 'components/dialog/index';
import Camera from './Camera';
class PhotoPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null
    };
  }
  onScreenshot(screenshot) {
    this.setState({ screenshot });
  }
  handleClick = () => {
    Dialog(
      'Prendre une Photo',
      {
        Content: Camera,
        contentProps: { onScreenshot: this.onScreenshot.bind(this) }
      },
      {
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
        fullScreen: false,
        BackdropProps: {
          invisible: false
        }
      }
    );
  };
  render() {
    return (
      <div>
        <h2>Screenshots</h2>
        <div className="screenshots">
          <div className="controls">
            <button onClick={this.handleClick}>capture</button>
          </div>
          {this.state.screenshot ? (
            <img alt="avatar" src={this.state.screenshot} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default PhotoPicker;
