import {
  CREATE_SESSION_SUCCESS,
  USER_VERIFIED,
  EMAIL_NOT_VERIFIED,
  HANDLE_USER_LOGOUT,
  UPDATE_EMAIL,
  REDIRECT,
} from './types';

export const createSession = (userInfo, redirect = { scene: 'MainScene', parameter: null }) => {
  return (dispatch) => {
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
        dispatch({ type: USER_VERIFIED });
      } else {
        dispatch({ type: EMAIL_NOT_VERIFIED, payload: responseJson.user.signupEmail });
      }
    })
    .then(() => {
      dispatch({ type: REDIRECT, payload: redirect });
    })
    .catch(error => console.log(error));
  };
};

export const updateEmail = (updatedEmail, userID) => {
  return (dispatch) => {
    dispatch({ type: USER_VERIFIED });
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/users/${userID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ updatedEmail })
    })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.currentEmail) {
        dispatch({ type: UPDATE_EMAIL, payload: responseJson.currentEmail });
        dispatch({ type: REDIRECT, payload: { scene: 'ProfileScene' } });
      } else {
        alert('failed to update email');
      }
    })
    .catch(error => console.err(error));
  };
};

export const redirectTo = (redirect) => {
  const { scene, parameter = null } = redirect;
  return {
    type: REDIRECT,
    payload: { scene, parameter },
  };
};

export const userLogout = () => {
  return {
    type: HANDLE_USER_LOGOUT,
  };
};
