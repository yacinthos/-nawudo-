import React, { Component } from 'react';
import Line from 'react-lazylog/build/Line';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import SocketIO from 'sdk/socket.io';
const styles = theme => ({
  root: {
    overflowX: 'scroll',
    backgroundColor: '#222222',
    color: '#d6d6d6',
    height: '500px',
    fontSize: '12px',
    fontFamily: 'Monaco, monospace',
    fontWeight: 400
  },
  line: {
    margin: 0,
    display: 'inline-block',
    userSelect: 'initial',
    whiteSpace: 'pre'
  },
  error: {
    margin: 0,
    display: 'inline-block',
    userSelect: 'initial',
    whiteSpace: 'pre',
    color: 'red'
  },
  progress: {
    height: '10px'
  }
});

class LogViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      logs: []
    };
  }
  logger(data) {
    this.setState({ logs: data.logs, percent: data.percent });
  }
  componentDidMount() {
    SocketIO.subscribe(this.props.event, this.logger.bind(this));
    //socket.on('progress', data => {
    //let logs = this.state.logs;
    //logs.push(data.log);

    //});
  }
  render() {
    const classes = this.props.classes;
    return (
      <React.Fragment>
        <LinearProgress
          className={this.props.classes.progress}
          color="primary"
          {...(!this.state.percent
            ? { variant: 'indeterminate' }
            : { variant: 'determinate', value: this.state.percent })}
        />
        <div className={classes.root}>
          {this.state.logs.map(function(log, key) {
            return (
              <Line
                className={log.error ? classes.error : classes.line}
                rowHeight={19}
                number={key}
                //{...(log.error ? { highlight: true } : { highlight: false })}
                key={key}
                data={[{ text: log.message }]}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
const Viewer = withStyles(styles)(LogViewer);
export const createLogViewer = function(event) {
  return class LogViewer extends Component {
    render() {
      return <Viewer event={event} />;
    }
  };
};
