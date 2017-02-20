import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_USER_ENTRIES,
  UPDATE_ENTRIES,
  SHOW_ENTRIES,
  TOGGLE_SCOPE,
  TOGGLE_SIDE_MENU,
  HANDLE_USER_LOGOUT,
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
  userFulfilled: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return {
        ...state,
        loading: true,
      };
    case GET_ENTRIES_SUCCESS:
      return {
        ...state,
        requests: action.payload.requests,
        thankYous: action.payload.thankYous,
        loading: false,
      };
    case GET_USER_ENTRIES: {
      const userEntries = [
        ...state.requests.filter(request => request.creator_id === action.payload),
        ...state.thankYous.filter(thankYou => thankYou.creator_id === action.payload)
      ];
      const userRequests =
      userEntries.filter(entry => (entry.type === 'request' && entry.donor_id === null));

      const userThankYous =
      userEntries.filter(entry => entry.type === 'thankYou');

      const userFulfilled =
      userEntries.filter(entry => entry.type === 'request' && entry.donor_id !== null);

      return {
        ...state,
        userRequests,
        userThankYous,
        userFulfilled,
      };
    }
    case UPDATE_ENTRIES:
      return {
        ...state,
        requests: action.payload.requests,
        thankYous: action.payload.thankYous
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
    case HANDLE_USER_LOGOUT:
      return {
        ...state,
        scope: 'requests_and_thank_yous',
        shown: 'Requests',
      };
    default:
      return state;
  }
};
