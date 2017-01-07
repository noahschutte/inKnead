import { combineReducers } from 'redux';
import EntriesReducer from './EntriesReducer';
import UsersReducer from './UsersReducer';
import NavigationReducer from './NavigationReducer';

export default combineReducers({
  entries: EntriesReducer,
  user: UsersReducer,
  navigation: NavigationReducer,
});
