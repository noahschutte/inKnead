import {
  CREATE_SESSION_SUCCESS,
  USER_VERIFIED,
  EMAIL_NOT_VERIFIED,
  UPDATE_EMAIL,
  HANDLE_USER_LOGOUT,
  HANDLE_USER_DONATION,
  INCOMING_PIZZA,
  AWAITING_THANK_YOUS,
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
        recentSuccessfulRequest: action.payload.recentSuccessfulRequest,
        recentThankYou: action.payload.recentThankYou,
      };
    case USER_VERIFIED: {
      return {
        ...state,
        userVerified: true,
      };
    }
    // case AWAITING_THANK_YOUS:
    //   return {
    //     ...state,
    //     notifications: [
    //       ...state.notifications,
    //       {
    //         id: 4,
    //         text: 'Your donation has received',
    //         expandable: {
    //           text: 'You\ve successful made a donation! Be on the lookout for a thank you from your recipient!',
    //           buttons: [
    //             {
    //               type: 'cancel',
    //               text: 'Cool',
    //               action: 'nothing'
    //             },
    //             {
    //               type: 'confirm',
    //               text: 'Clear',
    //               action: 'clear',
    //             }
    //           ]
    //         }
    //       }
    //     ]
    //   };
    // case INCOMING_PIZZA:
    //   return {
    //     ...state,
    //     notifications: [
    //       ...state.notifications,
    //       {
    //         id: 2,
    //         text: 'Incoming Pizza!',
    //         expandable: {
    //           /* eslint max-len: "off" */
    //           text: 'Someone has donated to a recent request of yours, watch for a gift card to arrive in your email!',
    //           buttons: [
    //             {
    //               type: 'cancel',
    //               text: 'Not yet...',
    //               action: 'nothing',
    //             },
    //             {
    //               type: 'confirm',
    //               text: 'Got it!',
    //               action: 'confirmDonation',
    //             }
    //           ]
    //         }
    //       }
    //     ]
    //   };
    // case CONFIRM_DONATION_RECEIVED:
    // case CREATE_THANK_YOU_REMINDER:
    //   return {
    //     ...state,
    //     notifications: [
    //       ...state.notifications,
    //       {
    //         id: 3,
    //         text: 'Thank your Donor!',
    //         expandable: {
    //           text: 'Reward the community by letting them see the impact of their good will',
    //           buttons: [
    //             {
    //               type: 'cancel',
    //               text: 'Not Yet',
    //               action: 'nothing',
    //             },
    //             {
    //               type: 'confirm',
    //               text: 'Okay!',
    //               action: 'createThankYou',
    //             }
    //           ]
    //         },
    //         redirect: {
    //           scene: 'EntryCreationScene',
    //           parameter: {
    //             createThankYou: true,
    //             entry: state.recentSuccessfulRequest,
    //           },
    //         }
    //       }
    //     ]
    //   };
    // case EMAIL_NOT_VERIFIED:
    //   return {
    //     ...state,
    //     userVerified: false,
    //     notifications: [
    //       ...state.notifications,
    //       {
    //         id: 0,
    //         text: 'Please verify your email',
    //         expandable: {
    //           text: 'Gift cards are sent to you by email, it\'s important that yours is up to date!',
    //           buttons: [
    //             {
    //               type: 'cancel',
    //               text: 'Not Now',
    //               action: 'nothing',
    //             },
    //             {
    //               type: 'confirm',
    //               text: 'Verify',
    //               action: 'verifyEmail'
    //             }
    //           ]
    //         },
    //         redirect: {
    //           scene: 'EmailVerifyScene',
    //           parameter: {
    //             currentEmail: state.userData.current_email,
    //             signupEmail: state.userData.signup_email,
    //           }
    //         },
    //       },
    //     ],
    //   };
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
    // case HANDLE_USER_DONATION:
    //   return {
    //     ...state,
    //     activeDonation: action.payload.activeDonation,
    //     recipientEmail: action.payload.recipientEmail,
    //     notifications: [
    //       ...state.notifications,
    //       {
    //         id: 1,
    //         text: 'You have an outstanding donation',
    //         expandable: {
    //           text: 'Once your recipient acknowledges the donation, they\'ll send you a thank you video!',
    //           buttons: [
    //             {
    //               type: 'cancel',
    //               text: 'Close',
    //               action: 'nothing'
    //             },
    //             {
    //               type: 'confirm',
    //               text: 'Instructions',
    //               action: 'completeDonation',
    //             }
    //           ]
    //         },
    //         redirect: {
    //           scene: 'InstructionsScene',
    //           parameter: {
    //             recipientEmail: action.payload.recipientEmail,
    //             entry: action.payload.activeDonation,
    //           }
    //         }
    //       }
    //     ]
    //   };
    default:
      return state;
  }
};
