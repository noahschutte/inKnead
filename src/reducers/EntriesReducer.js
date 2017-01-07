import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_USER_ENTRIES,
  GET_USER_ENTRIES_SUCCESS,
  SHOW_ENTRIES,
  TOGGLE_SCOPE,
  TOGGLE_SIDE_MENU
} from '../actions/types';

const INITIAL_STATE = {
  scope: 'requests_and_thank_yous',
  shown: 'Requests',
  sideMenuOpen: false,
  loading: true,
  requests: [],
  thankYous: [],
  userRequests: [],
  userThankYous: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return {
        ...state,
        scope: 'requests_and_thank_yous',
      };
    case GET_ENTRIES_SUCCESS:
      return {
        ...state,
        requests: action.payload.requests,
        thankYous: action.payload.thankYous,
        loading: false,
      };
    case GET_USER_ENTRIES:
    case GET_USER_ENTRIES_SUCCESS:
      return {
        ...state,
        userRequsts: action.payload.userRequests,
        userThankYous: action.payload.userThankYous,
        loading: false,
      };
    case SHOW_ENTRIES:
      return {
        ...state,
        shown: action.payload,
      };
    case TOGGLE_SCOPE:
      return {
        ...state,
        scope: action.payload.scope,
        shown: action.payload.shown
      };
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
         sideMenuOpen: action.payload
      };
    default:
      return state;
  }
};
