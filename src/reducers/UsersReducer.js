import { Actions } from 'react-native-router-flux';
import {
  CREATE_SESSION_SUCCESS,
  DIRECT_TO_LOGIN,
  USER_VERIFIED,
  HANDLE_USER_LOGOUT,
  HANDLE_USER_DONATION,
  REDIRECT,
} from '../actions/types';

const INITIAL_STATE = {
  /* userData, when not null looks something like:
    {
      created_at,
      current_email,
      fb_userID,
      id,
      rating,
      signup_email,
      updated_at
    }
  */
  userData: null,
  userVerified: false,
  activeDonation: null,
  recipientEmail: '',
  recentSuccessfulRequest: null,
  recentThankYou: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DIRECT_TO_LOGIN:
      Actions.LoginScene();
      return state;
    case REDIRECT:
      switch (action.payload.scene) {
        case 'EntryScene':
          Actions.EntryScene({ entry: action.payload.parameter });
          return state;
        case 'ProfileScene':
          Actions.ProfileScene({ type: 'reset' });
          return state;
        default:
          Actions.pop();
          return state;
      }
    case CREATE_SESSION_SUCCESS:
      return {
        ...state,
        userData: action.payload.user,
        activeDonation: action.payload.activeDonation,
        recipientEmail: action.payload.anonEmail,
        recentSuccessfulRequest: action.payload.recentSuccessfulRequest,
        recentThankYou: action.payload.recentThankYou,
      };
    case USER_VERIFIED:
      return {
        ...state,
        userVerified: action.payload
      };
    case HANDLE_USER_LOGOUT:
      return INITIAL_STATE;
    case HANDLE_USER_DONATION:
      return {
        ...state,
        activeDonation: action.payload.activeDonation,
        recipientEmail: action.payload.recipientEmail,
      };
    default:
      return state;
  }
};
