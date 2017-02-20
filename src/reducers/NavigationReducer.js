import { Actions } from 'react-native-router-flux';
import { REDIRECT, TOGGLE_SIDE_MENU, CLOSE_SIDE_MENU } from '../actions/types';

const INITIAL_STATE = {
  scene: 'MainScene',
  sideMenuOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        sideMenuOpen: action.payload
      };
    case CLOSE_SIDE_MENU:
      return {
        ...state,
        sideMenuOpen: action.payload
      };
    case REDIRECT:
      switch (action.payload.scene) {
        case 'MainScene':
          if (action.payload.parameter === 'root') {
            Actions.root({ type: 'reset' });
          } else {
            Actions.MainScene({ type: 'reset' });
          }
          return state;
        case 'EntryScene':
          Actions.root().EntryScene({ entry: action.payload.parameter });
          return state;
        case 'ProfileScene':
          Actions.root({ type: 'reset' });
          Actions.ProfileScene();
          return state;
        case 'InstructionsScene':
          Actions.InstructionsScene({
            recipientEmail: action.payload.parameter.recipientEmail,
            entry: action.payload.parameter.entry
          });
          return state;
        case 'EmailVerifyScene':
          Actions.EmailVerifyScene({
            currentEmail: state.userData.current_email,
            signupEmail: state.userData.signup_email
          });
          return state;
        default:
          Actions.pop();
          return state;
      }
    default:
      return state;
  }
};
