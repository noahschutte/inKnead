import { Actions } from 'react-native-router-flux';
import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_USER_ENTRIES,
  UPDATE_ENTRIES,
  HANDLE_USER_DONATION,
  TOGGLE_SCOPE,
  DIRECT_TO_LOGIN,
  SHOW_ENTRIES,
  TOGGLE_SIDE_MENU,
} from './types';

export const confirmDonation = (donatorId, entry) => {
  return dispatch => {
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/requests/${entry.id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ donatorId })
    })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.errorMessage) {
        console.error(responseJson.errorMessage);
      } else {
        const { requests, thankYous, anonEmail } = responseJson;
        dispatch({
          type: UPDATE_ENTRIES,
          payload: {
            requests,
            thankYous
          }
        });
        dispatch({
          type: HANDLE_USER_DONATION,
          payload: {
            activeDonation: entry,
            recipientEmail: anonEmail,
          }
        });
      }
    })
    .then(() => {
      Actions.NotificationsScene();
    })
    .catch(error => console.error(error));
  };
};

export const getEntries = () => {
  return (dispatch) => {
    dispatch({ type: GET_ENTRIES });
    fetch('https://d1dpbg9jbgrqy5.cloudfront.net/requests', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
    })
    .then(data => data.json())
    .then(entries => {
      dispatch({ type: GET_ENTRIES_SUCCESS, payload: entries });
    });
  };
};

export const getUserEntries = (userId) => {
  return ({
    type: GET_USER_ENTRIES,
    payload: userId
  });
};

export const sortEntries = (key) => {
  return ({
    type: SHOW_ENTRIES,
    payload: key,
  });
};

export const toggleScope = (currentScope, userData = null) => {
  if (currentScope === 'requests_and_thank_yous') {
    if (!userData) {
      return (dispatch) => {
        dispatch({
          type: DIRECT_TO_LOGIN
        });
      };
    }
    return (dispatch) => {
      dispatch({
        type: TOGGLE_SCOPE,
        payload: {
          scope: 'user_history',
          shown: 'Requested',
        }
      });
      if (userData) {
        dispatch({
          type: GET_USER_ENTRIES,
          payload: userData.id
        });
      }
    };
  }
  return ({
    type: TOGGLE_SCOPE,
    payload: {
      scope: 'requests_and_thank_yous',
      shown: 'Requests'
    }
  });
};

export const sideMenuToggle = (isMenuOpen) => {
  if (isMenuOpen) {
    return {
      type: TOGGLE_SIDE_MENU,
      payload: false
    };
  }
  return {
    type: TOGGLE_SIDE_MENU,
    payload: true
  };
};
