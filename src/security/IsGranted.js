import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import React from 'react';
import _ from 'lodash';
const isGrantedDefaults = {
    wrapperDisplayName: 'isGranted'
};

const FailureComponent= () => <h1>You are not allow</h1>;

function selector(state,roles=[]) {
    return  !_.isEmpty(state.token) && _.every(roles, function(role) { return _.indexOf(state.token.user.roles, role)>= 0; });
}
export function isGranted(roles=[]) {
    return connectedAuthWrapper({
        ...isGrantedDefaults,
        authenticatedSelector: (state) => selector(state,roles),
        FailureComponent: FailureComponent
    });
}
export function onlyGranted(roles=[]) {
    return connectedAuthWrapper({
        ...isGrantedDefaults,
        authenticatedSelector: (state) => selector(state,roles)
    });
}
