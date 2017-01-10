import {
  UPDATE_SELECTED_PIZZAS,
  UPDATE_SELECTED_VENDOR,
} from '../actions/types';

const INITIAL_STATE = {
  pizzas: 0,
  vendor: '',
  videoKey: '',
  uploading: false,
  progress: null,
  paused: true,
  uploadPercentage: 0,
  uploadStatus: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_PIZZAS:
      return {
        ...state,
        pizzas: action.payload
      };
    case UPDATE_SELECTED_VENDOR:
      return {
        ...state,
        vendor: action.payload
      };
    default:
      return state;
  }
};
