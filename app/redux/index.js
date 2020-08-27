import { combineReducers } from 'redux'
import user from './reducers/user'
import {createStore} from 'redux';

// const rootReducer = combineReducers({
//    user
// });

const store = createStore(
   user
 );

export default store