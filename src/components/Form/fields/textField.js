import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
class textField extends Component {

    render() {

        const { input, label, meta: { touched, error }, ...custom } = this.props;
        return (
            <TextField autoComplete="off" label={label}
                       {...input}
                       {...custom}
                       InputLabelProps={{shrink: true}}
                       {...(touched && error ? {
                           error:true,
                           FormHelperTextProps: {error:true},
                           helperText: error
                       }:{})}
            />
        );
    }

}

export default textField;
