import { REDIRECT } from './types';

export const redirectTo = (redirect) => {
  const { scene, parameter = null } = redirect;
  return {
    type: REDIRECT,
    payload: { scene, parameter },
  };
};
