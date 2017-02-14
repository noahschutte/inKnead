import { Actions } from 'react-native-router-flux';
import {
  CREATE_SESSION_SUCCESS,
  USER_VERIFIED,
  EMAIL_NOT_VERIFIED,
  UPDATE_EMAIL,
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
  notifications: {},
  userVerified: false,
  activeDonation: null,
  recipientEmail: '',
  recentSuccessfulRequest: null,
  recentThankYou: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REDIRECT:
      switch (action.payload.scene) {
        case 'MainScene':
          Actions.MainScene({ type: 'reset' });
          return state;
        case 'EntryScene':
          Actions.EntryScene({ entry: action.payload.parameter });
          return state;
        case 'ProfileScene':
          Actions.ProfileScene({ type: 'reset' });
          return state;
        case 'InstructionsScene':
          Actions.InstructionsScene({
            recipientEmail: action.payload.parameter.recipientEmail,
            entry: action.payload.parameter.entry
          });
          return state;
        case 'EmailVerifyScene':
          Actions.EmailVerifyScene({
            currentEmail: state.userData.current_email,
            signupEmail: state.userData.signup_email
          });
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
        userVerified: true
      };
    case EMAIL_NOT_VERIFIED:
      return {
        ...state,
        userVerified: false,
        notifications: [
          ...state.notifications,
          {
            text: 'Please verify your email',
            redirect: {
              scene: 'EmailVerifyScene',
              parameter: action.payload,
            },
          },
        ],
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        userData: {
          ...state.userData,
          current_email: action.payload,
        }
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
