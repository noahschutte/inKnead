import { TOGGLE_VIDEO_PLAYING } from '../actions/types';

const INITIAL_STATE = {
  paused: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_VIDEO_PLAYING:
      return {
        ...state,
        paused: action.payload,
      };
    default: return state;
  }
};
