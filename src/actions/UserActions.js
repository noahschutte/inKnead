import {
  CREATE_SESSION_START,
  CREATE_SESSION_SUCCESS,
  HANDLE_USER_LOGOUT,
} from './types';

export const createSession = (userInfo) => {
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
    })
    .catch(error => console.log(error));
  };
};

export const userLogout = () => {
  return {
    type: HANDLE_USER_LOGOUT,
  };
};
