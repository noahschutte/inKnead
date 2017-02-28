import { Actions } from 'react-native-router-flux';
import {
  CREATE_SESSION_SUCCESS,
  HANDLE_USER_DONATION,
  AWAITING_DONATION,
  CONFIRM_DONATION_RECEIVED,
  CREATE_THANK_YOU_REMINDER,
  EMAIL_VERIFIED,
  EMAIL_NOT_VERIFIED,
  HANDLE_USER_LOGOUT,
  UPDATE_EMAIL,
  REDIRECT,
} from './types';

export const createSession = (userInfo, redirect = { scene: 'MainScene', parameter: 'root' }) => {
  return (dispatch) => {
    fetch('https://d1dpbg9jbgrqy5.cloudfront.net/users', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ userInfo })
    })
    .then((response) => response.json())
    .then(responseJson => {
      const {
        user,
        activeDonation,
        anonEmail,
        recentSuccessfulRequest,
        recentThankYou
      } = responseJson;

      dispatch({ type: CREATE_SESSION_SUCCESS, payload: responseJson });
      if (user.current_email) {
        dispatch({ type: EMAIL_VERIFIED });
      } else {
        dispatch({ type: EMAIL_NOT_VERIFIED, payload: user.signupEmail });
      }
      if (activeDonation) {
        dispatch({
          type: HANDLE_USER_DONATION,
          payload: {
            activeDonation,
            recipientEmail: anonEmail,
          }
        });
      }
      if (recentSuccessfulRequest) {
        if (recentSuccessfulRequest.status === 'active') {
          dispatch({
            type: AWAITING_DONATION,
            payload: {
              userID: user.id,
              requestID: recentSuccessfulRequest.id
            }
          });
        }
        if (recentSuccessfulRequest.status === 'received' && !recentThankYou) {
          dispatch({ type: CREATE_THANK_YOU_REMINDER });
        }
      }
    })
    .then(() => {
      dispatch({ type: REDIRECT, payload: redirect });
    })
    .catch(error => console.log(error));
  };
};

export const confirmDonationReceived = (userID, requestID) => {
  return dispatch => {
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/requests/${requestID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        userID,
        receivedDonation: true,
      })
    })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({ type: CONFIRM_DONATION_RECEIVED, payload: responseJson.recentSuccessfulRequest });
      Actions.EntryCreationScene({ createThankYou: true });
    })
    .catch(error => {
      console.error(error);
    });
  };
};

export const updateEmail = (updatedEmail, userID, redirect = null) => {
  return (dispatch) => {
    dispatch({ type: EMAIL_VERIFIED });
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
        if (!redirect) {
          dispatch({ type: REDIRECT, payload: { scene: 'ProfileScene' } });
        } else {
          dispatch({ type: REDIRECT, payload: redirect });
        }
      } else {
        alert('failed to update email');
      }
    })
    .catch(error => console.err(error));
  };
};

export const userLogout = () => {
  const redirectToMainScene = new Promise((resolve) => {
    Actions.root({ type: 'reset' });
    resolve('success');
  });
  return dispatch => {
    redirectToMainScene.then(() => {
      dispatch({ type: HANDLE_USER_LOGOUT });
    })
    .catch(err => console.log(err));
  };
};
