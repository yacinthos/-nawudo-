import * as UserActions from 'constants/UserActions';

const initialUser= {};

const user = (state = initialUser, action) => {
    switch (action.type) {
        case UserActions.USER_SET_ATTRIBUTES:
            return {
                ...state,
                ...action.attributes
            };
        case UserActions.USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export default user;