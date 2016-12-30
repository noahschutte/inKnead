import { GET_ENTRIES_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  requests: [],
  thankYous: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ENTRIES_SUCCESS:
      return {
        ...state,
        requests: action.payload.requests,
        thankYous: action.payload.thankYous,
        loading: false,
      }
    default:
      return state;
  }
}
