import {
  CREATE_SESSION_SUCCESS,
  USER_VERIFIED,
  EMAIL_NOT_VERIFIED,
  UPDATE_EMAIL,
  HANDLE_USER_LOGOUT,
  HANDLE_USER_DONATION,
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
              parameter: {
                currentEmail: state.userData.current_email,
                signupEmail: state.userData.signup_email,
              }
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
