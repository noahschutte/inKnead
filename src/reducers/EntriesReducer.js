import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_USER_ENTRIES,
  GET_USER_ENTRIES_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  scope: 'requests_and_thank_yous',
  loading: true,
  requests: [],
  thankYous: [],
  userRequests: [],
  userThankYous: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return {
        ...state,
        scope: 'requests_and_thank_yous',

    case GET_ENTRIES_SUCCESS:
      return {
        ...state,
        requests: action.payload.requests,
        thankYous: action.payload.thankYous,
        loading: false,
      }
    case GET_USER_ENTRIES:
      return {
        ...state,
        scope: 'user_history',
      }
    case GET_USER_ENTRIES_SUCCESS:
      return {
        ...state,
        userRequsts: action.payload.userRequests,
        userThankYous: action.payload.userThankYous,
        loading: false,
      }
    default:
      return state;
  }
};
