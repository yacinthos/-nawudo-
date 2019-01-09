import React, { Component } from 'react';
import * as fields from 'components/Form/fields';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import validator from 'forms/validator';
import { FormButton, Alert } from 'components';

const constraints = {
  /* start_station: {
    presence: {
      allowEmpty: false,
      message: 'La station de départ est obligatoire'
    }
  },
  end_station: {
    presence: {
      allowEmpty: false,
      message: 'La station d’arrivée est obligatoire'
    }
  }*/
};
const validate = validator(constraints);

class SearchForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      error,
      reset,
      submitting,
      send
    } = this.props;
    return (
      <div>
        {error && <Alert message={error} type="error" />}
        <form onSubmit={handleSubmit(send)}>
          <fieldset>
            <Field
              label="Station de départ"
              type="text"
              name="start_station"
              component={fields.textField}
              fullWidth
              margin="normal"
              className="mt-1"
            />
            <Field
              label="Station d’arrivée"
              type="text"
              name="end_station"
              component={fields.textField}
              fullWidth
              margin="normal"
              className="mt-1"
            />
            <Field
              label="date de départ"
              type="date"
              name="start_date"
              component={fields.textField}
              fullWidth
              margin="normal"
              className="mt-1"
            />
            <Field
              label="nombre total de voyageurs"
              type="number"
              name="total_traveler"
              component={fields.textField}
              fullWidth
              margin="normal"
              className="mt-1"
            />
            <FormButton
              type="submit"
              disabled={pristine || submitting}
              loading={submitting}
              variant="raised"
              color="blue"
            >
              <i className="zmdi zmdi-sign-in zmdi-hc-fw" />
              <span>Rechercher</span>
            </FormButton>
            <FormButton
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
              variant="raised"
              color="pink"
            >
              <i className="zmdi zmdi-close zmdi-hc-fw" />
              <span>Annuler</span>
            </FormButton>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'SearchForm',
  validate
})(SearchForm);
