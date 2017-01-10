import { combineReducers } from 'redux';
import EntriesReducer from './EntriesReducer';
import UsersReducer from './UsersReducer';
import EntryCreationReducer from './EntryCreationReducer';

export default combineReducers({
  entries: EntriesReducer,
  user: UsersReducer,
  newEntry: EntryCreationReducer,
});
