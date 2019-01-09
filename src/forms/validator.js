import { SubmissionError } from 'redux-form';

const validator = require('validate.js');
const _ = require('lodash');
let DataObjectParser = require('dataobject-parser');
validator.formatters.custom = function(errors) {
  let inputs_errors = {};
  _.each(errors, function(error) {
    inputs_errors['"' + error.attribute + '"'] = errorText(
      error.attribute,
      error.error
    );
  });
  return inputs_errors;
};

const errorText = function(name, error) {
  name = _.replace(name, '.', ' ') + ' ';
  name = _.replace(name, /([A-Z]+)/g, ' $1');
  const pattern = new RegExp(name, 'i');
  if (_.isArray(error)) {
    return _.replace(error[0], pattern, '');
  } else {
    return _.replace(error, pattern, '');
  }
};

const validate = function(constraints) {
  return function(values) {
    return DataObjectParser.transpose(
      validator(values, constraints, { format: 'custom' })
    ).data();
  };
};
export default validate;
