import { combineReducers } from 'redux'
import user from './reducers/user';
import stylist from './reducers/stylist'
import {createStore} from 'redux';

const rootReducer = combineReducers({
   user,
   stylist
});

const store = createStore(
   rootReducer
);

export default store