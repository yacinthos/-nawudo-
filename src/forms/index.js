import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import validator, { submit } from 'forms/validator';
import { toast } from 'mdbreact';
import { Alert, FormButton } from 'components';
import { CardBox } from 'containers';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import IconArrowBack from '@material-ui/icons/ArrowBack';
import { push } from 'connected-react-router';
import IconCheck from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  buttonText: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }
});
export const appForm = function(WrappedForm, metaData = {}) {
  class Form extends Component {
    render() {
      const {
        error,
        pristine,
        classes,
        dispatch,
        submit,
        reset,
        submitting
      } = this.props;
      return (
        <div className="row">
          <CardBox
            styleName="col-lg-12"
            heading={
              <AppBar position="static" color="inherit">
                <Toolbar>
                  {metaData.title && metaData.title.length > 0 ? (
                    <Fragment>
                      <IconButton
                        onClick={function() {
                          dispatch(push(metaData.backUrl));
                        }}
                        aria-label="Retour"
                      >
                        <IconArrowBack />
                      </IconButton>
                      <h4 className="mb-0 mr-auto">{metaData.title}</h4>
                    </Fragment>
                  ) : null}
                  <FormButton
                    type="button"
                    onClick={submit}
                    disabled={pristine || submitting}
                    loading={submitting}
                    variant="raised"
                    color="blue"
                  >
                    <i className="zmdi zmdi-save zmdi-hc-fw" />
                    <span className={classes.buttonText}>Enregistrer</span>
                  </FormButton>
                  <FormButton
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                    variant="raised"
                    color="pink"
                  >
                    <i className="zmdi zmdi-close zmdi-hc-fw" />
                    <span className={classes.buttonText}>Annuler</span>
                  </FormButton>
                </Toolbar>
              </AppBar>
            }
          >
            <div />
            <div className="row">
              <div className="col-lg-12">
                {error && <Alert message={error} type="error" />}
                <WrappedForm {...this.props} />
              </div>
            </div>
          </CardBox>
        </div>
      );
    }
  }
  return reduxForm({
    form: metaData.name,
    onSubmitSuccess: function(result, dispatch, props) {
      if (metaData.successMessage) {
        toast(
          <div>
            <span className="icon-addon alert-addon">
              {' '}
              <IconCheck />
            </span>
            <span className="d-inline-block">{metaData.successMessage}</span>
          </div>,
          {
            closeButton: false
          }
        );
      }
      props.reset();
      if (
        metaData.onSubmitSuccess &&
        typeof metaData.onSubmitSuccess === 'function'
      ) {
        metaData.onSubmitSuccess(result, dispatch, props);
      }
    },
    validate: validator(metaData.constraints),
    onSubmit: submit(
      metaData.api.name,
      metaData.api.action,
      metaData.normalize ||
        function(values) {
          return values;
        }
    )
  })(withStyles(styles)(Form));
};
export default appForm;
