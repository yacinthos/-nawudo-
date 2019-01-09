import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import {push} from 'react-router-redux';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import _ from 'lodash';

const isAuthenticatedDefaults = {
    authenticatedSelector: state => ! _.isEmpty(state.token),
    wrapperDisplayName: 'isAuthenticated'
};
export function isAuthenticated() {
    return connectedReduxRedirect({
        ...isAuthenticatedDefaults,
        redirectPath: '/login',
        redirectAction: (location) => (dispatch) => {
            dispatch(push(location));
        }
    });
}
export function onlyAuthenticated() {
    return connectedAuthWrapper({
        ...isAuthenticatedDefaults
    });
}
