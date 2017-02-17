import { combineReducers } from 'redux';
import EntriesReducer from './EntriesReducer';
import UsersReducer from './UsersReducer';
import EntryCreationReducer from './EntryCreationReducer';
import CameraReducer from './CameraReducer';
import NavigationReducer from './NavigationReducer';

export default combineReducers({
  entries: EntriesReducer,
  user: UsersReducer,
  newEntry: EntryCreationReducer,
  camera: CameraReducer,
  nav: NavigationReducer,
});
