import React,{Component} from 'react';
import FileInput from 'components/FileInput';

class FileInputField extends Component {

    render() {

        const { input:{onChange,onBlur,onFocus,value,...inputProps}, label, meta: { touched, error }, ...custom } = this.props;
        const errorMessages= touched && error ? {
                    error:true,
                    FormHelperTextProps: {error:true},
                    helperText: error
                }:{};
        return (
            <FileInput
                {...errorMessages}
                {...custom}
                label={label}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                value={value}
            />
        );
    }

}

export default FileInputField;