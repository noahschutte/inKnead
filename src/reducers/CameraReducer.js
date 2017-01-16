import Camera from 'react-native-camera';
import {
  START_RECORDING
} from '../actions/types';

const INITIAL_STATE = {
  aspect: Camera.constants.Aspect.fit,
  mode: Camera.constants.CaptureMode.video,
  captureTarget: Camera.constants.CaptureTarget.disk,
  type: Camera.constants.Type.front,
  orientation: Camera.constants.Orientation.portrait,
  flashMode: Camera.constants.FlashMode.off,
  torchMode: Camera.constants.TorchMode.off,
  captureQuality: Camera.constants.CaptureQuality.medium,
  isRecording: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_RECORDING:
      return {
        ...state,
        isRecording: true,
      };
    default:
      return state;
  }
};
