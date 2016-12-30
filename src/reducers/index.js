import { combineReducers } from 'redux';
import EntriesReducer from './EntriesReducer';

export default combineReducers({
  entries: EntriesReducer
});
