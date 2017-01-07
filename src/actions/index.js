import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  CREATE_SESSION_START,
  CREATE_SESSION_SUCCESS,
  SHOW_ENTRIES,
  TOGGLE_SCOPE
} from './types';

export * from './NavigationActions';

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

export const toggleScope = (currentScope) => {
  if (currentScope === 'requests_and_thank_yous') {
    return ({
      type: TOGGLE_SCOPE,
      payload: {
        scope: 'user_history',
        shown: 'Kneaded'
      }
    });
  }
  return ({
    type: TOGGLE_SCOPE,
    payload: {
      scope: 'requests_and_thank_yous',
      shown: 'Requests'
    }
  });
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
