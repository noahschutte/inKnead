import { Actions } from 'react-native-router-flux';
import { NAVIGATE_TO } from '../actions/types';

const INITIAL_STATE = {
  currentScene: 'MainScene',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAVIGATE_TO:
      switch (action.payload) {
        case 'MainScene':
          Actions.MainScene();
          return {
            ...state,
            currentScene: action.payload,
          };
        case 'CameraScene':
          Actions.CameraScene();
          return {
            ...state,
            currentScene: action.payload,
          };
        case 'EntryCreationScene':
          Actions.MainScene();
          return {
            ...state,
            currentScene: action.payload,
          };
        case 'EntryScene':
          Actions.EntryScene();
          return {
            ...state,
            currentScene: action.payload,
          };
        case 'HowToScene':
          Actions.HowToScene();
          return {
            ...state,
            currentScene: action.payload,
          };
        case 'NotificationsScene':
          Actions.NotificationsScene();
          return {
            ...state,
            currentScene: action.payload,
          };
        case 'ProfileScene':
          Actions.ProfileScene();
          return {
            ...state,
            currentScene: action.payload,
          };
        case 'UserHistoryScene':
          Actions.UserHistoryScene();
          return {
            ...state,
            currentScene: action.payload,
          };
        default:
          return state;
      }
    default:
      return state;
  }
};
