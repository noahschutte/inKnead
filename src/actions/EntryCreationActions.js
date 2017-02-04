import {
  UPDATE_SELECTED_PIZZAS,
  UPDATE_SELECTED_VENDOR,
  UPLOAD_PROGRESS,
  UPLOAD_COMPLETE,
  HANDLE_ERRORS,
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

export const uploadProgress = (evt) => {
  if (evt.lengthComputable) {
    const percentComplete = Math.round((evt.loaded * 100) / evt.total);
    return {
      type: UPLOAD_PROGRESS,
      payload: percentComplete
    };
  }
};

export const uploadComplete = () => {
  return {
    type: UPLOAD_COMPLETE
  };
};

export const handleErrors = (errorMessageArray) => {
  return {
    type: HANDLE_ERRORS,
    payload: errorMessageArray,
  };
};
