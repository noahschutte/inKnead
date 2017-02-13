import {
  CREATE_SESSION_START,
  CREATE_SESSION_SUCCESS,
  USER_VERIFIED,
  HANDLE_USER_LOGOUT,
  REDIRECT,
} from './types';

export const createSession = (userInfo, redirect = { scene: 'MainScene', parameter: null }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_SESSION_START });
    fetch('https://d1dpbg9jbgrqy5.cloudfront.net/users', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ userInfo }),
    })
    .then((response) => response.json())
    .then(responseJson => {
      dispatch({ type: CREATE_SESSION_SUCCESS, payload: responseJson });
      if (responseJson.user.current_email) {
        dispatch({ type: USER_VERIFIED, payload: true });
      }
    })
    .then(() => {
      dispatch({ type: REDIRECT, payload: redirect });
    })
    .catch(error => console.log(error));
  };
};

export const userLogout = () => {
  return {
    type: HANDLE_USER_LOGOUT,
  };
};
