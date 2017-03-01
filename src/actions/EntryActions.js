import { Actions } from 'react-native-router-flux';
import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_USER_ENTRIES,
  UPDATE_ENTRIES,
  HANDLE_USER_DONATION,
  TOGGLE_SCOPE,
  SHOW_ENTRIES,
  TOGGLE_SIDE_MENU,
  REDIRECT,
  DELETE_ENTRY,
  UPDATE_TOTAL_DONATED_PIZZAS,
} from './types';

export const confirmDonation = (donatorId, entry) => {
  return (dispatch) => {
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/requests/${entry.id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ userID: donatorId })
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
        dispatch({
          type: REDIRECT,
          payload: {
            scene: 'InstructionsScene',
            parameter: {
              recipientEmail: anonEmail,
              entry,
            }
          }
        });
      }
    })
    .catch(error => console.error(error));
  };
};

export const deleteEntry = (entryId) => {
  return (dispatch) => {
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/requests/${entryId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.requests) {
        dispatch({ type: DELETE_ENTRY, payload: responseJson });
      }
      Actions.MainScene({ type: 'reset' });
    })
    .catch(err => console.error(err));
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
      dispatch({ type: UPDATE_TOTAL_DONATED_PIZZAS, payload: entries.totalDonatedPizzas });
    })
    .catch(err => console.error(err));
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
      Actions.LoginScene();
    } else {
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
