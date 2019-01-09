import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const defaultHeadCellStyles = {
  tooltip: {
    cursor: 'pointer'
  }
};

class MUIDataTableHeadCell extends React.Component {
  static propTypes = {
    /** Extend the style applied to components */
    classes: PropTypes.object,
    /** Options used to describe table */
    options: PropTypes.object.isRequired,
    /** Current sort direction */
    sortDirection: PropTypes.string,
    /** Callback to trigger column sort */
    toggleSort: PropTypes.func.isRequired,
    /** Sort enabled / disabled for this column **/
    sort: PropTypes.bool.isRequired
  };

  render() {
    const {
      children,
      classes,
      options,
      toggleSort,
      sortDirection,
      sort,
      index,
      activeColumn
    } = this.props;
    const sortActive =
      sortDirection !== null && sortDirection !== undefined ? true : false;

    const sortLabelProps =
      activeColumn === index
        ? {
            active: sortActive,
            ...(activeColumn === index && sortDirection
              ? { direction: sortDirection }
              : {})
          }
        : {};

    return (
      <TableCell scope={'col'} sortDirection={sortDirection}>
        {options.sort && sort ? (
          <Tooltip
            title={options.textLabels.body.toolTip}
            placement={'bottom-end'}
            classes={{
              tooltip: classes.tooltip
            }}
            enterDelay={300}
          >
            <TableSortLabel
              onKeyUp={() => toggleSort()}
              onClick={() => toggleSort()}
              {...sortLabelProps}
            >
              {children}
            </TableSortLabel>
          </Tooltip>
        ) : (
          children
        )}
      </TableCell>
    );
  }
}

export default withStyles(defaultHeadCellStyles, {
  name: 'MUIDataTableHeadCell'
})(MUIDataTableHeadCell);
