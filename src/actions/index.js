import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_USER_ENTRIES,
  CREATE_SESSION_START,
  CREATE_SESSION_SUCCESS,
  SHOW_ENTRIES,
  TOGGLE_SCOPE,
  TOGGLE_SIDE_MENU,
} from './types';

export * from './EntryCreationActions';

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

export const sortEntries = (key) => {
  return ({
    type: SHOW_ENTRIES,
    payload: key,
  });
};

export const toggleScope = (currentScope, userData = null) => {
  if (currentScope === 'requests_and_thank_yous') {
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
