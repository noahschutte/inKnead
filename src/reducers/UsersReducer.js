import {
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_START,
} from '../actions/types';

const INITIAL_STATE = {
  userData: null,
  activeDonation: null,
  anonEmail: '',
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
        anonEmail: action.payload.anonEmail,
        recentSuccessfulRequest: action.payload.recentSuccessfulRequest,
        recentThankYou: action.payload.recentThankYou,
      };
    default:
      return state;
  }
};
