import React from 'react';
import classNames from 'classnames';
import TableHead from '@material-ui/core/TableHead';
import MUIDataTableHeadRow from './MUIDataTableHeadRow';
import MUIDataTableHeadCell from './MUIDataTableHeadCell';
import MUIDataTableSelectCell from './MUIDataTableSelectCell';
import { withStyles } from '@material-ui/core/styles';

const defaultHeadStyles = {
  main: {},
  responsiveStacked: {
    '@media screen and (max-width: 960px)': {
      display: 'none'
    }
  }
};

class MUIDataTableHead extends React.Component {
  componentDidMount() {
    this.props.handleHeadUpdateRef(this.handleUpdateCheck);
  }

  handleRowSelect = () => {
    this.props.selectRowUpdate('head', null);
  };

  render() {
    const {
      classes,
      columns,
      data,
      toggleSort,
      options,
      selectedRows
    } = this.props;

    const selectedRowsLen = (selectedRows && selectedRows.length) || 0;
    const isDeterminate = selectedRowsLen > 0 && selectedRowsLen < data.length;
    const isChecked =
      data.length > 0 && selectedRowsLen === data.length ? true : false;

    return (
      <TableHead
        className={classNames({
          [classes.responsiveStacked]: options.responsive === 'stacked',
          [classes.main]: true
        })}
      >
        <MUIDataTableHeadRow>
          {options.selectableRows && (
            <MUIDataTableSelectCell
              onChange={this.handleRowSelect.bind(null)}
              indeterminate={isDeterminate}
              checked={isChecked}
            />
          )}
          {columns.map(
            (column, index) =>
              column.display &&
              (column.customHeadRender ? (
                column.customHeadRender(
                  { index, ...column },
                  this.handleToggleColumn
                )
              ) : (
                <MUIDataTableHeadCell
                  key={index}
                  index={index}
                  type={'cell'}
                  sort={column.sort}
                  sortDirection={column.sortDirection}
                  toggleSort={() => toggleSort(index)}
                  options={options}
                  activeColumn={this.props.activeColumn}
                >
                  {column.label}
                </MUIDataTableHeadCell>
              ))
          )}
        </MUIDataTableHeadRow>
      </TableHead>
    );
  }
}

export default withStyles(defaultHeadStyles, { name: 'MUIDataTableHead' })(
  MUIDataTableHead
);
