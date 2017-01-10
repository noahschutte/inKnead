import {
  UPDATE_SELECTED_PIZZAS,
  UPDATE_SELECTED_VENDOR
} from './types';

export const updateSelectedPizzas = (numberOfPizzas) => {
  return {
    type: UPDATE_SELECTED_PIZZAS,
    payload: numberOfPizzas,
  };
};

export const updateSelectedVendor = (selectedVendor) => {
  return {
    type: UPDATE_SELECTED_VENDOR,
    payload: selectedVendor,
  };
};
