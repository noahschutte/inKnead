import { combineReducers } from 'redux';
import EntriesReducer from './EntriesReducer';
import UsersReducer from './UsersReducer';
import EntryCreationReducer from './EntryCreationReducer';
import CameraReducer from './CameraReducer';

export default combineReducers({
  entries: EntriesReducer,
  user: UsersReducer,
  newEntry: EntryCreationReducer,
  camera: CameraReducer,
});
