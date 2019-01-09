import pink from 'material-ui/colors/pink';
import blue from 'material-ui/colors/blue';

export default {
    palette: {
        primary: {
            light: blue[300],
            main: blue[500],
            dark: blue[300],
        },
        secondary: {
            light: pink[300],
            main: pink['A200'],
            dark: pink[700],
        }
    },
    status: {
        danger: 'orange',
    },
    typography: {
        button: {
            fontWeight: 400,
            textAlign: 'capitalize'
        },
    },
};
