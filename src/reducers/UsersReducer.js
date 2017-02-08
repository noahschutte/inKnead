import { Actions } from 'react-native-router-flux';
import {
  CREATE_SESSION_SUCCESS,
  DIRECT_TO_LOGIN,
  USER_VERIFIED,
  HANDLE_USER_LOGOUT,
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
  anonEmail: '',
  recentSuccessfulRequest: null,
  recentThankYou: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DIRECT_TO_LOGIN:
      Actions.GuestUserScene();
      return state;
    case CREATE_SESSION_SUCCESS:
      Actions.MainScene({ type: 'reset' });
      return {
        ...state,
        userData: action.payload.user,
        activeDonation: action.payload.activeDonation,
        anonEmail: action.payload.anonEmail,
        recentSuccessfulRequest: action.payload.recentSuccessfulRequest,
        recentThankYou: action.payload.recentThankYou,
      };
    case USER_VERIFIED:
      return {
        ...state,
        userVerified: action.payload
      };
    case HANDLE_USER_LOGOUT:
      Actions.MainScene({ type: 'reset' });
      return INITIAL_STATE;
    default:
      return state;
  }
};
