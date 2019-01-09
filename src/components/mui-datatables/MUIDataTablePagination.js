import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';
const defaultPaginationStyles = {
  root: {
    '&:last-child': {
      padding: '0px 24px 0px 24px'
    }
  },
  toolbar: {},
  selectRoot: {},
  '@media screen and (max-width: 400px)': {
    toolbar: {
      '& span:nth-child(2)': {
        display: 'none'
      }
    },
    selectRoot: {
      marginRight: '8px'
    }
  }
};

class MUIDataTablePagination extends React.Component {
  static propTypes = {
    /** Total number of table rows */
    count: PropTypes.number.isRequired,
    /** meta data of table rows */
    meta: PropTypes.object.isRequired,
    /** Options used to describe table */
    options: PropTypes.object.isRequired,
    /** Total number allowed of rows per page */
    rowsPerPage: PropTypes.number.isRequired,
    /** Callback to trigger rows per page change */
    changeRowsPerPage: PropTypes.func.isRequired
  };

  handleRowChange = event => {
    this.props.changeRowsPerPage(event.target.value);
  };

  handlePageChange = (_, page) => {
    this.props.changePage(page);
  };

  render() {
    const {
      classes,
      options,
      meta,
      changePage,
      changeRowsPerPage,
      rowsPerPageOptions,
      rowsPerPage
    } = this.props;
    const textLabels = options.textLabels.pagination;

    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            className={classes.root}
            classes={{
              caption: classes.caption,
              toolbar: classes.toolbar,
              selectRoot: classes.selectRoot
            }}
            count={meta.totalItemCount ? meta.totalItemCount : 0}
            rowsPerPage={rowsPerPage}
            page={meta.currentPage ? meta.currentPage - 1 : 0}
            labelRowsPerPage={textLabels.rowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} ${textLabels.displayRows} ${count}`
            }
            backIconButtonProps={{
              'aria-label': textLabels.previous
            }}
            nextIconButtonProps={{
              'aria-label': textLabels.next
            }}
            rowsPerPageOptions={rowsPerPageOptions}
            onChangePage={(_, page) => {
              changePage(page + 1);
            }}
            onChangeRowsPerPage={event => {
              changeRowsPerPage(event.target.value);
            }}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

export default withStyles(defaultPaginationStyles, {
  name: 'MUIDataTablePagination'
})(MUIDataTablePagination);
