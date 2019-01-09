import {combineReducers} from 'redux';
import Settings from './Settings';
import User from './User';
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
    form: formReducer,
    settings: Settings,
    token: User
});

export default reducers;
