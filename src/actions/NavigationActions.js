import { NAVIGATE_TO } from './types.js';

export const navigateTo = (sceneName) => {
  return {
    action: NAVIGATE_TO,
    payload: sceneName,
  };
};
