import { GET_PROPS } from '../actions/types';

const INITIAL_STATE = {
  scene: 'MainScene',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROPS:
      return state;
    default:
      return state;
  }
};
