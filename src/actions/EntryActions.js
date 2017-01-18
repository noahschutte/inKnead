import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_USER_ENTRIES,
  TOGGLE_SCOPE,
  DIRECT_TO_LOGIN,
  SHOW_ENTRIES,
  TOGGLE_SIDE_MENU,
} from './types';

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
