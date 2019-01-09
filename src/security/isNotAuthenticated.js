import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import _ from 'lodash';
import {push} from 'react-router-redux';

const isNotAuthenticatedDefaults = {
    authenticatedSelector: state => _.isEmpty(state.token),
    wrapperDisplayName: 'isNotAuthenticated'
};
const locationHelper = locationHelperBuilder({});

export function isNotAuthenticated() {
    return connectedReduxRedirect({
        ...isNotAuthenticatedDefaults,
        redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
        redirectAction: (location) => (dispatch) => {
            dispatch(push(location));
        },
        allowRedirectBack: false
    });
}
export function onlyNotAuthenticated() {
    return connectedAuthWrapper({
        ...isNotAuthenticatedDefaults
    });
}