import React from 'react';
import Typography from '@material-ui/core/Typography';
import { default as SearchForm } from 'forms/SearchForm';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Api, travel as data } from 'Api';
import _isEmpty from 'lodash/isEmpty';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    width: '100%'
  },
  logo: {
    width: '100px',
    margin: 'auto',
    padding: '20px'
  },
  form: {
    marginTop: '10px',
    width: '500px',
    margin: 'auto',
    padding: '20px'
  },
  result: {
    marginTop: '10px',
    width: '90%',
    margin: 'auto',
    paddingTop: '20px'
  }
});
class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    travel: null
  };
  send(values, dispatch, props) {
    return Api(values).then(response => {
      this.setState({ travel: response });
      console.log(this.state.travel);
    });
  }

  componentDidMount() {}
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Paper className={classes.logo}>
          <Typography variant="h5" component="h3">
            Nawudo
          </Typography>
        </Paper>
        <div className={classes.form}>
          <SearchForm send={this.send.bind(this)} />
        </div>
        <Paper className={classes.result}>
          {_isEmpty(this.state.travel) ? (
            <Typography variant="h5" component="h3">
              Aucun voyage ne correspond a vos critères de recherches
            </Typography>
          ) : (
            <div>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Date de depart </TableCell>
                    <TableCell align="right">Date d'arrivé</TableCell>
                    <TableCell align="right">Station de depart</TableCell>
                    <TableCell align="right">Station d'arrivé</TableCell>
                    <TableCell align="right">Prix</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.travel.map((row, key) => {
                    return (
                      <TableRow key={key}>
                        <TableCell align="right" scope="row">
                          {row.start_date}
                        </TableCell>
                        <TableCell align="right">{row.end_date}</TableCell>
                        <TableCell align="right">{row.start_station}</TableCell>
                        <TableCell align="right">{row.end_station}</TableCell>
                        <TableCell align="right">{row.price} FCFA</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </Paper>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(HomePage));
