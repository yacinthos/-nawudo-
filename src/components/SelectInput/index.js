import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AsyncSelect from 'react-select/lib/Async';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
const _ = require('lodash');
const styles = theme => ({
  root: {
    flexGrow: 1
    // height: 250,
  },
  input: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipSingle: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    // width: '95%'
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 2000,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});
class NoOptionsMessage extends React.Component {
  render() {
    const props = this.props;
    return (
      <div>
        {props.selectProps.addOption ? (
          <MenuItem
            component="div"
            style={{
              fontWeight: props.isSelected ? 500 : 400
            }}
            onClick={props.selectProps.addOption}
          >
            <Typography color="textSecondary">
              {props.selectProps.addOptionMessage}
            </Typography>
          </MenuItem>
        ) : (
          <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
          >
            {props.selectProps.notFoundMessage}
          </Typography>
        )}
      </div>
    );
  }
}

class inputComponent extends React.Component {
  render() {
    const { inputRef, ...props } = this.props;
    return <div ref={inputRef} {...props} />;
  }
}

class Control extends React.Component {
  render() {
    const props = this.props;
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps
          }
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }
}

class Option extends React.Component {
  render() {
    const props = this.props;
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
}

class Placeholder extends React.Component {
  render() {
    const props = this.props;
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {/*props.children*/}
      </Typography>
    );
  }
}

class SingleValue extends React.Component {
  render() {
    const props = this.props;
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={classNames(props.selectProps.classes.chipSingle, {
          [props.selectProps.classes.chipFocused]: props.isFocused
        })}
        onClick={() => {}}
      />
    );
  }
}

class ValueContainer extends React.Component {
  render() {
    const props = this.props;
    return (
      <div className={props.selectProps.classes.valueContainer}>
        {props.children}
      </div>
    );
  }
}

class MultiValue extends React.Component {
  render() {
    const props = this.props;
    console.log(props);
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={classNames(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }
}

class Menu extends React.Component {
  render() {
    const props = this.props;
    return (
      <Paper
        square
        className={props.selectProps.classes.paper}
        {...props.innerProps}
      >
        {props.children}
      </Paper>
    );
  }
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

class SelectInput extends React.Component {
  static defaultProps = {
    multiple: false,
    onChange: value => {
      //console.log('change value:' + value);
    },
    onBlur: value => {
      //console.log('blur value:' + value);
    },
    onFocus: value => {
      //console.log('focus value:' + value);
    },
    idName: 'id',
    notFoundMessage: 'Aucune option trouvée',
    addOptionMessage: 'Ajouter un nouveau',
    getOptionValue: option => option['id'],
    getOptionLabel: option => option['label'],
    textFieldProps: {},
    addOption: null
  };
  state = {
    value: null,
    options: null,
    loading: true,
    error: null
  };

  handleChange = selectedOptions => {
    //const value = this.getValue(selectedOptions);
    this.setState({
      value: selectedOptions
    });
    this.props.onChange(selectedOptions);
  };
  /*
  getValue(selectedOptions) {
    if (_.isEmpty(selectedOptions)) {
      return null;
    }
    if (this.props.multiple) {
      return selectedOptions.map(value => this.props.getOptionValue(value));
    } else {
      return this.props.getOptionValue(selectedOptions);
    }
  }

  selectedOptions(value) {
    if (_.isEmpty(this.state.options)) {
      return null;
    }
    const idName = this.props.idName;
    if (this.props.multiple) {
      return _.filter(this.state.options, function(o) {
        return _.includes(value, o[idName]);
      });
    } else {
      return _.filter(this.state.options, function(o) {
        return value === o[idName];
      });
    }
  }*/
  loader(inputValue, cb) {
    this.props
      .optionsLoader(inputValue)
      .then(response => {
        this.setState({ error: null });
        cb(response.data);
      })
      .catch(error => {
        this.setState({
          error: error.response.data.error.message
          //loading: false
        });
      });
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      value: nextProps.value
    });
  }

  render() {
    const { classes, theme, ...props } = this.props;
    const value = this.state.value ? this.state.value : null;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary
      })
    };
    return (
      <div className={classes.root}>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={this.loader.bind(this)}
          classes={classes}
          styles={selectStyles}
          //{...(this.state.options ? { options: this.state.options } : {})}
          //isLoading={this.state.loading}
          textFieldProps={{
            label: props.label,
            ...props.textFieldProps,
            InputLabelProps: {
              shrink: true
            },
            //onChange: ()=>props.onChange(value),
            onFocus: () => props.onFocus(value),
            onBlur: () => props.onBlur(value)
          }}
          components={components}
          value={value}
          onChange={this.handleChange}
          notFoundMessage={props.notFoundMessage}
          addOption={props.addOption}
          addOptionMessage={props.addOptionMessage}
          //placeholder={props.label}
          isMulti={props.multiple}
          isClearable={true}
          //getOptionValue={props.getOptionValue}
          getOptionLabel={props.getOptionLabel}
        />
      </div>
    );
  }
}

SelectInput.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  optionsLoader: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  textFieldProps: PropTypes.object.isRequired,
  notFoundMessage: PropTypes.string.isRequired,
  addOption: PropTypes.func,
  addOptionMessage: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(SelectInput);
