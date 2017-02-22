import {
  CREATE_SESSION_SUCCESS,
  EMAIL_VERIFIED,
  EMAIL_NOT_VERIFIED,
  UPDATE_EMAIL,
  HANDLE_USER_LOGOUT,
  HANDLE_USER_DONATION,
  AWAITING_DONATION,
  CONFIRM_DONATION_RECEIVED,
  CREATE_THANK_YOU_REMINDER,
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
  notifications: [],
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
    case EMAIL_VERIFIED: {
      const notifications = [];
      for (const notification of state.notifications) {
        if (notification.id !== 0) {
          notifications.push(notification);
        }
      }
      return {
        ...state,
        userVerified: true,
        notifications,
      };
    }
    case AWAITING_DONATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: 2,
            text: 'Incoming Pizza!',
            expandable: {
              /* eslint max-len: "off" */
              text: 'Someone has donated to a recent request of yours, watch for a gift card to arrive in your email!',
              buttons: [
                {
                  type: 'cancel',
                  text: 'Not yet...',
                  action: 'nothing',
                },
                {
                  type: 'confirm',
                  text: 'Got it!',
                  action: 'confirmDonation',
                }
              ]
            }
          }
        ]
      };
    case CONFIRM_DONATION_RECEIVED:
      console.log('reached here');
      return {
        ...state
      };
    case CREATE_THANK_YOU_REMINDER:
      return {
        ...state
      };
    case EMAIL_NOT_VERIFIED:
      return {
        ...state,
        userVerified: false,
        notifications: [
          ...state.notifications,
          {
            id: 0,
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
        notifications: [
          ...state.notifications,
          {
            id: 1,
            text: 'You have an outstanding donation',
            redirect: {
              scene: 'InstructionsScene',
              parameter: {
                recipientEmail: action.payload.recipientEmail,
                entry: action.payload.activeDonation,
              }
            }
          }
        ]
      };
    default:
      return state;
  }
};
