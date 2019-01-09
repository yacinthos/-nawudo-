import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import MUIDataTableToolbar from './MUIDataTableToolbar';
import MUIDataTableToolbarSelect from './MUIDataTableToolbarSelect';
import MUIDataTableFilterList from './MUIDataTableFilterList';
import MUIDataTableBody from './MUIDataTableBody';
import MUIDataTableHead from './MUIDataTableHead';
import MUIDataTablePagination from './MUIDataTablePagination';
import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import _filter from 'lodash/filter';
import _indexOf from 'lodash/indexOf';
import textLabels from './textLabels';
import { withStyles } from '@material-ui/core/styles';

const defaultTableStyles = {
  root: {},
  responsiveScroll: {
    overflowX: 'auto'
  },
  caption: {
    position: 'absolute',
    left: '-1000px'
  }
};

class MUIDataTable extends React.Component {
  static propTypes = {
    /** Title of the table */
    title: PropTypes.string.isRequired,
    /** Data used to describe table */
    serverRequest: PropTypes.func.isRequired,
    /** Columns used to describe table */
    columns: PropTypes.PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          options: PropTypes.shape({
            display: PropTypes.bool,
            filter: PropTypes.bool,
            sort: PropTypes.bool,
            customHeadRender: PropTypes.func,
            customBodyRender: PropTypes.func
          })
        })
      ])
    ).isRequired,
    /** Options used to describe table */
    options: PropTypes.shape({
      responsive: PropTypes.oneOf(['stacked', 'scroll']),
      textLabels: PropTypes.object,
      pagination: PropTypes.bool,
      customToolbar: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
      customToolbarSelect: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.element
      ]),
      customFooter: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
      onRowClick: PropTypes.func,
      resizableColumns: PropTypes.bool,
      selectableRows: PropTypes.bool,
      caseSensitive: PropTypes.bool,
      rowHover: PropTypes.bool,
      page: PropTypes.number,
      count: PropTypes.number,
      filterData: PropTypes.array,
      rowsFormat: PropTypes.func,
      rowsSelected: PropTypes.array,
      rowsPerPage: PropTypes.number,
      rowsPerPageOptions: PropTypes.array,
      filter: PropTypes.bool,
      sort: PropTypes.bool,
      search: PropTypes.bool,
      print: PropTypes.bool,
      viewColumns: PropTypes.bool,
      download: PropTypes.bool
    }),
    /** Pass and use className to style MUIDataTable as desired */
    className: PropTypes.string
  };

  static defaultProps = {
    title: '',
    options: {},
    data: [],
    columns: []
  };

  constructor(props) {
    super();
    this.tableRef = false;
    this.state = {
      activeColumn: null,
      data: [],
      rowsPerPage: props.options.rowsPerPage || 10,
      rowsPerPageOptions: props.options.rowsPerPageOptions || [10, 20, 50],
      columns: [],
      loading: false,
      filterData: props.options.filterData || {},
      selectedRows: props.options.rowsSelected || [],
      showResponsive: false,
      searchText: null,
      rowCount: 0,
      meta: {}
    };
  }

  componentWillMount() {
    this.initializeTable(this.props);
  }

  componentDidMount() {
    this.setServerRequest('initial');
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.data !== nextProps.data ||
      this.props.columns !== nextProps.columns
    ) {
      this.initializeTable(nextProps);
    }
  }

  initializeTable(props) {
    this.getDefaultOptions(props);
    this.setColumnData(props);
  }

  /*
   * React currently does not support deep merge for defaultProps. Objects are overwritten
   */
  setData = result => {
    this.setState({
      data: result.data,
      rowCount: result.meta.totalItemCount,
      meta: result.meta,
      loading: false
    });
  };
  getDefaultOptions(props) {
    const defaultOptions = {
      responsive: 'stacked',
      pagination: true,
      textLabels,
      resizableColumns: false,
      selectableRows: true,
      caseSensitive: false,
      serverSide: false,
      rowHover: true,
      filter: true,
      sortFilterList: true,
      sort: true,
      search: false,
      print: true,
      viewColumns: true,
      download: true
    };

    this.options = merge(defaultOptions, props.options);
  }

  setServerRequest = action => {
    this.setState({ loading: true });
    this.props.serverRequest(action, this.state, this.setData.bind(this));
  };

  /*
   *  Build the source table data
   */

  setColumnData(props) {
    const { columns } = props;

    let columnData = [];

    columns.forEach((column, colIndex) => {
      let columnOptions = {
        display: true,
        filter: true,
        sort: false,
        sortDirection: null
      };
      if (typeof column === 'object') {
        columnOptions = {
          name: column.name,
          label: column.label || column.name,
          ...columnOptions,
          ...(column.options ? column.options : {})
        };
      } else {
        columnOptions = { ...columnOptions, name: column, label: column.name };
      }
      columnData.push(columnOptions);
    });
    this.setState(prevState => ({
      columns: columnData
    }));
  }

  //  Table Action
  toggleViewColumn = index => {
    this.setState(
      prevState => {
        const columns = cloneDeep(prevState.columns);
        columns[index].display = !columns[index].display;
        return {
          columns: columns
        };
      },
      () => {
        if (this.options.onColumnViewChange) {
          this.options.onColumnViewChange(
            this.state.columns[index].name,
            this.state.columns[index].display ? 'add' : 'remove'
          );
        }
      }
    );
  };

  toggleSortColumn = index => {
    this.setState(
      prevState => {
        let columns = cloneDeep(prevState.columns);
        columns[index].sortDirection =
          columns[index].sortDirection === 'asc' ? 'desc' : 'asc';
        return {
          columns: columns,
          activeColumn: index
        };
      },
      () => {
        this.setServerRequest('sort');
      }
    );
  };

  changeRowsPerPage = rows => {
    this.setState(
      () => ({
        rowsPerPage: rows
      }),
      () => {
        this.setServerRequest('changeRowsPerPage');
        if (this.options.onChangeRowsPerPage) {
          this.options.onChangeRowsPerPage(this.state.rowsPerPage);
        }
      }
    );
  };

  changePage = page => {
    this.setState(
      prevState => {
        let meta = cloneDeep(prevState.meta);
        meta.currentPage = page;
        return {
          meta: meta
        };
      },
      () => {
        this.setServerRequest('changePage');
        if (this.options.onChangePage) {
          this.options.onChangePage(this.state.page);
        }
      }
    );
  };

  searchTextUpdate = text => {
    this.setState(
      prevState => ({
        searchText: text && text.length ? text : null
      }),
      () => {
        this.setServerRequest('search');
      }
    );
  };

  resetFilters = () => {
    this.setState(
      prevState => {
        return {
          filterData: {}
        };
      },
      () => {
        this.setServerRequest('resetFilters');
        if (this.options.onFilterChange) {
          this.options.onFilterChange(null, this.state.filterData);
        }
      }
    );
  };

  filterUpdate = (value, index) => {
    this.setState(
      prevState => {
        const filterData = cloneDeep(prevState.filterData);
        filterData[index] = value;
        return {
          filterData: filterData
        };
      },
      () => {
        this.setServerRequest('filterChange');
        if (this.options.onFilterChange) {
          this.options.onFilterChange(index, this.state.filterData);
        }
      }
    );
  };

  selectRowUpdate = (type, index) => {
    if (type === 'head') {
      this.setState(
        prevState => {
          const { data } = prevState;
          const selectedRowsLen = prevState.selectedRows.length;
          const isDeselect =
            selectedRowsLen === data.length ||
            (selectedRowsLen < data.length && selectedRowsLen > 0)
              ? true
              : false;

          let selectedRows = [];
          if (!isDeselect) {
            for (let index = 0; index < data.length; index++) {
              selectedRows[index] = index;
            }
          }
          return {
            selectedRows: selectedRows
          };
        },
        () => {
          if (this.options.onRowsSelect) {
            this.options.onRowsSelect(this.state.selectedRows);
          }
        }
      );
    } else if (type === 'cell') {
      this.setState(
        prevState => {
          let selectedRows = [...prevState.selectedRows];
          if (_indexOf(selectedRows, index) > -1) {
            selectedRows = _filter(selectedRows, function(value) {
              return index !== value;
            });
          } else {
            selectedRows.push(index);
          }
          return {
            selectedRows: selectedRows
          };
        },
        () => {
          if (this.options.onRowsSelect) {
            this.options.onRowsSelect(this.state.selectedRows);
          }
        }
      );
    }
  };

  render() {
    const { classes, title } = this.props;
    const {
      data,
      columns,
      activeColumn,
      filterData,
      rowsPerPage,
      selectedRows,
      searchText,
      loading,
      meta,
      rowsPerPageOptions
    } = this.state;
    return (
      <Paper
        elevation={4}
        ref={el => (this.tableContent = el)}
        className={classes.paper}
      >
        {selectedRows.length ? (
          <MUIDataTableToolbarSelect
            options={this.options}
            selectedRows={selectedRows}
          />
        ) : (
          <MUIDataTableToolbar
            columns={columns}
            data={data}
            filterData={filterData}
            filterUpdate={this.filterUpdate}
            options={this.options}
            resetFilters={this.resetFilters}
            searchTextUpdate={this.searchTextUpdate}
            tableRef={() => this.tableContent}
            title={title}
            toggleViewColumn={this.toggleViewColumn}
          />
        )}
        <MUIDataTableFilterList
          options={this.options}
          filterData={filterData}
          filterUpdate={this.filterUpdate}
        />
        <div
          style={{ position: 'relative' }}
          className={
            this.options.responsive === 'scroll'
              ? classes.responsiveScroll
              : null
          }
        >
          <Table ref={el => (this.tableRef = el)} tabIndex={'0'} role={'grid'}>
            <caption className={classes.caption}>{title}</caption>
            <MUIDataTableHead
              columns={columns}
              data={data}
              handleHeadUpdateRef={fn => (this.updateToolbarSelect = fn)}
              selectedRows={selectedRows}
              selectRowUpdate={this.selectRowUpdate}
              toggleSort={this.toggleSortColumn}
              activeColumn={activeColumn}
              options={this.options}
            />
            <MUIDataTableBody
              data={data}
              loading={loading}
              count={this.state.rowCount}
              columns={columns}
              rowsPerPage={rowsPerPage}
              selectedRows={selectedRows}
              selectRowUpdate={this.selectRowUpdate}
              options={this.options}
              searchText={searchText}
              filterData={filterData}
            />
          </Table>
        </div>
        <Table>
          {this.options.customFooter
            ? this.options.customFooter(
                this.state.rowCount,
                meta.currentPage,
                rowsPerPage,
                meta,
                this.changeRowsPerPage,
                this.changePage
              )
            : this.options.pagination && (
                <MUIDataTablePagination
                  count={this.state.rowCount}
                  meta={meta}
                  rowsPerPage={rowsPerPage}
                  changeRowsPerPage={this.changeRowsPerPage}
                  changePage={this.changePage}
                  component={'div'}
                  options={this.options}
                  rowsPerPageOptions={rowsPerPageOptions}
                />
              )}
        </Table>
      </Paper>
    );
  }
}

export default withStyles(defaultTableStyles, { name: 'MUIDataTable' })(
  MUIDataTable
);
