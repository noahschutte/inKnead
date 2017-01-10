import { combineReducers } from 'redux';
import EntriesReducer from './EntriesReducer';
import UsersReducer from './UsersReducer';
import VideoReducer from './VideoReducer';

export default combineReducers({
  entries: EntriesReducer,
  user: UsersReducer,
  video: VideoReducer,
});
