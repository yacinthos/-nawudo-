import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import MUIDataTableBodyCell from './MUIDataTableBodyCell';
import MUIDataTableBodyRow from './MUIDataTableBodyRow';
import MUIDataTableSelectCell from './MUIDataTableSelectCell';
import _indexOf from 'lodash/indexOf';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const defaultBodyStyles = {
  root: {},
  emptyTitle: {
    textAlign: 'center'
  }
};

class MUIDataTableBody extends React.Component {
  static propTypes = {
    /** Data used to describe table */
    data: PropTypes.array.isRequired,
    /** Total number of data rows */
    count: PropTypes.number.isRequired,
    /** Columns used to describe table */
    columns: PropTypes.array.isRequired,
    /** Options used to describe table */
    options: PropTypes.object.isRequired,
    /** Data used to filter table against */
    filterData: PropTypes.object,
    /** Callback to execute when row is clicked */
    onRowClick: PropTypes.func,
    loading: PropTypes.bool.isRequired,
    /** Table rows selected */
    selectedRows: PropTypes.array,
    /** Callback to trigger table row select */
    selectRowUpdate: PropTypes.func,
    /** Data used to search table against */
    searchText: PropTypes.string,
    /** Extend the style applied to components */
    classes: PropTypes.object
  };

  isRowSelected(index) {
    return _indexOf(this.props.selectedRows, index) > -1 ? true : false;
  }
  formatRow = row => {
    return this.props.options.rowsFormat
      ? this.props.options.rowsFormat(row)
      : row;
  };
  render() {
    const {
      classes,
      columns,
      selectRowUpdate,
      options,
      data,
      loading
    } = this.props;
    console.log(columns);
    return (
      <TableBody>
        {loading ? (
          <MUIDataTableBodyRow options={options}>
            <MUIDataTableBodyCell
              colSpan={
                options.selectableRows ? columns.length + 1 : columns.length
              }
              options={options}
              colIndex={0}
              rowIndex={0}
            >
              <Typography variant="subheading" className={classes.emptyTitle}>
                Traitement en cours ...
              </Typography>
              <LinearProgress />
            </MUIDataTableBodyCell>
          </MUIDataTableBodyRow>
        ) : data.length > 0 ? (
          data.map((row, rowIndex) => (
            <MUIDataTableBodyRow
              options={options}
              rowSelected={
                options.selectableRows ? this.isRowSelected(rowIndex) : false
              }
              onClick={
                options.onRowClick
                  ? options.onRowClick.bind(null, rowIndex, row)
                  : null
              }
              id={'MUIDataTableBodyRow-' + rowIndex}
              key={rowIndex}
            >
              {options.selectableRows ? (
                <MUIDataTableSelectCell
                  onClick={e => {
                    //this.handleRowSelect.bind(null, rowIndex);
                    e.stopPropagation();
                    selectRowUpdate('cell', rowIndex);
                  }}
                  checked={this.isRowSelected(rowIndex)}
                />
              ) : (
                false
              )}
              {this.formatRow(row).map(
                (column, index) =>
                  columns[index].display ? (
                    <MUIDataTableBodyCell
                      rowIndex={rowIndex}
                      colIndex={index}
                      columnHeader={columns[index].name}
                      options={options}
                      key={index}
                    >
                      {columns[index].customBody
                        ? columns[index].customBody(column, row)
                        : column}
                    </MUIDataTableBodyCell>
                  ) : (
                    false
                  )
              )}
            </MUIDataTableBodyRow>
          ))
        ) : (
          <MUIDataTableBodyRow options={options}>
            <MUIDataTableBodyCell
              colSpan={
                options.selectableRows ? columns.length + 1 : columns.length
              }
              options={options}
              colIndex={0}
              rowIndex={0}
            >
              <Typography variant="subheading" className={classes.emptyTitle}>
                {options.textLabels.body.noMatch}
              </Typography>
            </MUIDataTableBodyCell>
          </MUIDataTableBodyRow>
        )}
      </TableBody>
    );
  }
}

export default withStyles(defaultBodyStyles, { name: 'MUIDataTableBody' })(
  MUIDataTableBody
);
