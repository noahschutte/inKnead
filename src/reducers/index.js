import { combineReducers } from 'redux';
import EntriesReducer from './EntriesReducer';
import UsersReducer from './UsersReducer';

export default combineReducers({
  entries: EntriesReducer,
  user: UsersReducer,
});
