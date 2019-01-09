import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import FormHelperText from '@material-ui/core/FormHelperText';
import classNames from 'classnames';
const _ = require('lodash');
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    display: 'flex',
    width: '100%'
  },
  selectorButton: {
    margin: theme.spacing.unit
  },
  selectorInput: {
    display: 'none'
  },
  valueContainer: {
    width: '95%',
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  selector: {
    width: '5%'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class inputComponent extends React.Component {
  render() {
    const {
      inputRef,
      removeFile,
      onChange,
      isMultiple,
      classes,
      ...props
    } = this.props;
    return (
      <div
        ref={inputRef}
        {...props}
        className={classNames(classes.input, 'mt-1')}
      >
        <div className={classes.valueContainer}>
          {_.map(props.files, (file, key) => {
            return (
              <Chip
                key={key}
                label={file.name}
                className={classes.chip}
                onDelete={() => {
                  removeFile(props.files, file.name);
                }}
              />
            );
          })}
        </div>
        <div className={classes.selector}>
          {isMultiple ? (
            <input
              className={classes.selectorInput}
              id={'selector-input' + props.name}
              type="file"
              multiple
              onChange={onChange}
            />
          ) : (
            <input
              className={classes.selectorInput}
              id={'selector-input' + props.name}
              type="file"
              onChange={onChange}
            />
          )}
          <label htmlFor={'selector-input' + props.name}>
            <IconButton
              variant="fab"
              size="small"
              color="primary"
              component="span"
            >
              <CloudUploadIcon size="small" />
            </IconButton>
          </label>
        </div>
      </div>
    );
  }
}
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  static defaultProps = {
    multiple: false,
    error: false,
    helperText: null,
    onChange: value => {
      //console.log('change value:' + value);
    },
    onBlur: value => {
      //console.log('blur value:' + value);
    },
    onFocus: value => {
      //console.log('focus value:' + value);
    }
  };

  state = {
    value: this.props.value || null
  };
  handleChange(e) {
    const files =
      !_.isEmpty(e.target.files) && e.target.files.length > 0
        ? e.target.files
        : null;
    let value = this.state.value || [];
    _.forEach(files, function(file) {
      if (
        !_.find(value, function(f) {
          return f.name === file.name;
        })
      ) {
        value.push(file);
      }
    });
    this.setState({ value: value });
    this.props.onChange(value);
  }
  removeFile(files, name) {
    let value = [];
    _.forEach(files, function(file) {
      if (name !== file.name) {
        value.push(file);
      }
    });
    this.setState({ value: value });
    this.props.onChange(value);
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      value: nextProps.value
    });
  }

  render() {
    const props = this.props;
    return (
      <div className={props.classes.root}>
        <FormControl
          onBlur={() => props.onBlur(this.state.value)}
          onFocus={() => props.onFocus(this.state.value)}
          fullWidth
          className={props.classes.formControl}
          error={props.error}
        >
          <InputLabel shrink={true} htmlFor={props.name}>
            {props.label}
          </InputLabel>
          <Input
            id={props.name}
            inputComponent={inputComponent}
            inputProps={{
              classes: props.classes,
              name: props.name,
              onChange: this.handleChange,
              removeFile: this.removeFile,
              files: this.state.value,
              isMultiple: props.multiple
            }}
          />
          <FormHelperText error={props.error}>
            {props.helperText}
          </FormHelperText>
        </FormControl>
      </div>
    );
  }
}

FileInput.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
};

export default withStyles(styles)(FileInput);
