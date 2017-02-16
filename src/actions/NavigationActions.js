import { GET_PROPS } from './types';

export const getProps = (something) => {
  console.log(something);
  return {
    type: GET_PROPS,
  };
};
