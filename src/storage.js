import configureStore from './store/index';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();
const initialState = {};
export const store = configureStore(initialState, history);
