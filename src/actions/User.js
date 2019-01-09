import * as UserActions from 'constants/UserActions';

export function userSetAttributes(attributes) {
    return {type: UserActions.USER_SET_ATTRIBUTES, attributes};
}
export function userLogout() {
    return {type: UserActions.USER_LOGOUT};
}