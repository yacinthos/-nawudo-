import React, { Component } from 'react';
import SelectInput from 'components/SelectInput';

class SelectInputField extends Component {
  render() {
    const {
      optionsLoader,
      getOptionValue,
      getOptionLabel,
      input: { onChange, onBlur, onFocus, value, ...inputProps },
      label,
      meta: { touched, error },
      addOption,
      addOptionMessage,
      noOptionMessage,
      ...custom
    } = this.props;
    const errorMessages =
      touched && error
        ? {
            error: true,
            FormHelperTextProps: { error: true },
            helperText: error
          }
        : {};
    return (
      <SelectInput
        textFieldProps={{
          ...custom,
          ...errorMessages,
          ...inputProps
        }}
        {...custom}
        label={label}
        addOption={addOption ? addOption : null}
        addOptionMessage={addOptionMessage}
        noOptionMessage={noOptionMessage}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        optionsLoader={optionsLoader}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
      />
    );
  }
}

export default SelectInputField;
