import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import replace from 'helpers/replace'

import profileProvider from 'helpers/profileProvider';

let counter = 0;

function createData(username, firstname, lastname, location, averagescore, didid) {
  counter += 1;
  return { id: counter, username, firstname, lastname, location, averagescore, didid };
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
}

const columnData = [
  { id: 'pic', numeric: false, disablePadding: true, label: 'Picture' },
  { id: 'username', numeric: false, disablePadding: true, label: 'Username' },
  { id: 'first', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'last', numeric: false, disablePadding: true, label: 'Last Name' },
  { id: 'location', numeric: false, disablePadding: true, label: 'Location' },
  { id: 'averagescore', numeric: true, disablePadding: false, label: 'Reviews' },
];

class IndividualSearchResultsHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

IndividualSearchResultsHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    flexDirection: 'column',
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

class IndividualSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'firstname',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
    };
  }

  componentDidMount() {
    this.updateSearchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchName !== prevProps.searchName) {
      this.updateSearchData();
    }
  }

  updateSearchData() {
    let currentSearchName = this.props.searchName;

    console.log("Calling update search with search name: "+currentSearchName)

    profileProvider.searchProfiles('individual', undefined, this.props.searchName).then(results => {
      if (currentSearchName === this.props.searchName) {
        this.setState({ data: results.map(profile => createData(profile.username, profile.firstname, profile.lastname, undefined, undefined, profile.id)) });
      }
    });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <h3>Search Results</h3>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <IndividualSearchResultsHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                      <TableRow
                        hover
                        onClick={() => replace('/profile/' + n.didid)}
                        style={{ cursor: "pointer" }}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.didid}
                        selected={isSelected}
                      >
                        <TableCell component="th" scope="row" padding="none">
                          <Avatar
                                alt="Bob Smith"
                                src={require('images/default-avatar.png')}
                                className={classNames(classes.avatar, classes.bigAvatar)}
                              />
                        </TableCell>
                        <TableCell>{n.username}</TableCell>
                        <TableCell>{n.firstname}</TableCell>
                        <TableCell>{n.lastname}</TableCell>
                        <TableCell>{n.location}</TableCell>
                        <TableCell numeric>{n.averagescore}</TableCell>
                      </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

IndividualSearchResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndividualSearchResults);