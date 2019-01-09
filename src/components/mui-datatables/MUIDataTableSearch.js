import React from 'react';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';
import { DebounceInput } from 'react-debounce-input';
const defaultSearchStyles = {
  main: {
    display: 'flex',
    flex: '1 0 auto'
  },
  searchIcon: {
    marginTop: '10px',
    marginRight: '8px'
  },
  searchText: {
    flex: '1 0'
  },
  clearIcon: {
    '&:hover': {
      color: '#FF0000'
    }
  }
};

class MUIDataTableSearch extends React.Component {
  handleTextChange = e => {
    const { onSearchChange } = this.props.options;

    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
    this.props.onSearch(e.target.value);
  };

  componentWillMount() {
    // this.timer = null;
  }
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.onHide();
    }
  };

  render() {
    const { classes, options, onHide } = this.props;

    return (
      <Grow appear in={true} timeout={300}>
        <div className={classes.main} ref={el => (this.rootRef = el)}>
          <SearchIcon className={classes.searchIcon} />
          <DebounceInput
            element={TextField}
            minLength={2}
            debounceTimeout={500}
            className={classes.searchText}
            autoFocus={true}
            InputProps={{
              'aria-label': options.textLabels.toolbar.search
            }}
            onChange={this.handleTextChange.bind(this)}
            fullWidth={true}
          />
          <IconButton className={classes.clearIcon} onClick={onHide}>
            <ClearIcon />
          </IconButton>
        </div>
      </Grow>
    );
  }
}

export default withStyles(defaultSearchStyles, { name: 'MUIDataTableSearch' })(
  MUIDataTableSearch
);
