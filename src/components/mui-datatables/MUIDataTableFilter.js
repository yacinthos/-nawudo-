import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { DebounceInput } from 'react-debounce-input';
import TextField from '@material-ui/core/TextField';

export const defaultFilterStyles = {
  root: {
    padding: '16px 24px 16px 24px',
    fontFamily: 'Roboto',
    width: '250px'
  },
  header: {
    flex: '0 0 auto',
    marginBottom: '16px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    display: 'inline-block',
    marginLeft: '7px',
    color: '#424242',
    fontSize: '14px',
    fontWeight: 500
  },
  noMargin: {
    marginLeft: '0px'
  },
  reset: {
    alignSelf: 'left'
  },
  resetLink: {
    color: '#027cb5',
    backgroundColor: '#FFF',
    display: 'inline-block',
    marginLeft: '24px',
    fontSize: '12px',
    cursor: 'pointer',
    border: 'none',
    '&:hover': {
      color: '#FF0000'
    }
  },
  filtersSelected: {
    alignSelf: 'right'
  },
  /* checkbox */
  checkboxList: {
    flex: '1 1 100%',
    display: 'inline-flex',
    marginRight: '24px'
  },
  checkboxListTitle: {
    marginLeft: '7px',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#424242',
    textAlign: 'left',
    fontWeight: 500
  },
  checkboxFormGroup: {
    marginTop: '8px'
  },
  checkboxFormControl: {
    margin: '0px'
  },
  checkboxFormControlLabel: {
    fontSize: '15px',
    marginLeft: '8px',
    color: '#4a4a4a'
  },
  checkboxIcon: {
    //color: "#027cb5",
    width: '32px',
    height: '32px'
  },
  checkbox: {
    '&$checked': {
      color: '#027cB5'
    }
  },
  checked: {},
  /* selects */
  selectRoot: {
    //display: 'flex',
    //marginTop: '16px',
    //flexDirection: 'row',
    // flexWrap: 'wrap',
    width: '100%'
    //height: '80%',
    //justifyContent: 'space-between'
  },
  searchText: {
    flex: '1 1 calc(50% - 10px)',
    //marginRight: '10px',
    marginBottom: '10px'
  }
};

class MUIDataTableFilter extends React.Component {
  static propTypes = {
    /** Data used to populate filter dropdown/checkbox */
    filterData: PropTypes.object.isRequired,
    /** Options used to describe table */
    options: PropTypes.object.isRequired,
    /** Callback to trigger filter update */
    onFilterUpdate: PropTypes.func,
    /** Callback to trigger filter reset */
    onFilterRest: PropTypes.func,
    /** Extend the style applied to components */
    classes: PropTypes.object
  };

  /*constructor(props) {
    super(props);
  }
*/
  handleChange = (event, index) => {
    this.props.onFilterUpdate(event.target.value, index);
  };

  render() {
    const { classes, columns, filterData, options, onFilterReset } = this.props;
    const textLabels = options.textLabels.filter;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.reset}>
            <Typography
              variant="caption"
              className={classNames({
                [classes.title]: true,
                [classes.noMargin]: true
              })}
            >
              {textLabels.title}
            </Typography>
            <button
              className={classes.resetLink}
              tabIndex={0}
              aria-label={textLabels.reset}
              onClick={onFilterReset}
            >
              {textLabels.reset}
            </button>
          </div>
        </div>
        <div className={classes.selectRoot}>
          {columns.map(
            (column, index) =>
              column.filter ? (
                <DebounceInput
                  element={TextField}
                  minLength={2}
                  debounceTimeout={500}
                  className={classes.searchText}
                  //autoFocus={true}
                  autoComplete="off"
                  label={column.label}
                  key={index}
                  value={filterData[index]}
                  InputProps={{
                    'aria-label': options.textLabels.toolbar.search
                  }}
                  InputLabelProps={{ shrink: true }}
                  onChange={event => this.handleChange(event, index)}
                  fullWidth={true}
                />
              ) : (
                false
              )
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(defaultFilterStyles, { name: 'MUIDataTableFilter' })(
  MUIDataTableFilter
);
