import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';

const defaultFilterListStyles = {
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    margin: '0px 16px 0px 16px'
  },
  chip: {
    margin: '8px 8px 0px 0px'
  }
};

class MUIDataTableFilterList extends React.Component {
  static propTypes = {
    /** Data used to filter table against */
    filterData: PropTypes.object.isRequired,
    /** Callback to trigger filter update */
    onFilterUpdate: PropTypes.func,
    /** Extend the style applied to components */
    classes: PropTypes.object
  };
  delete(index) {
    this.props.filterUpdate('', index);
  }
  render() {
    const { classes, filterData } = this.props;

    return (
      <div className={classes.root}>
        {_map(
          filterData,
          (item, index) =>
            !isEmpty(item) ? (
              <Chip
                label={item}
                key={index}
                onDelete={() => this.delete(index)}
                className={classes.chip}
              />
            ) : (
              false
            )
        )}
      </div>
    );
  }
}

export default withStyles(defaultFilterListStyles, {
  name: 'MUIDataTableFilterList'
})(MUIDataTableFilterList);
