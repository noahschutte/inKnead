import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Camera from 'react-native-camera';
import {
  leftCaretImage,
  cameraSceneCamcorder,
  cameraSceneStopImage,
} from '../../assets';


class CameraScene extends Component {
  constructor(props) {
    super(props);

    this.camera = null;
  }
  render() {
    const {
      aspect,
      captureTarget,
      type,
      flashMode,
      isRecording,
    } = this.props.camera;

    let showRecordButton;
    if (!isRecording) {
      showRecordButton = (
        <TouchableOpacity
          style={styles.captureButton}
          onPress={() => console.log('record button pressed')}
        >
          <Image source={cameraSceneCamcorder}/>
        </TouchableOpacity>
      );
    } else {
      showRecordButton = (
        <TouchableOpacity
          style={styles.captureButton}
          onPress={() => console.log('record button pressed')}
        >
          <Image source={cameraSceneStopImage} />
        </TouchableOpacity>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar hidden />
        <Camera
          captureAudio
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={aspect}
          captureTarget={captureTarget}
          type={type}
          flashMode={flashMode}
          defaultTouchToFocusComponent
          defaultOnFocus
          mirrorImage
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={Actions.pop}
          >
            <Image source={leftCaretImage} />
          </TouchableOpacity>
          {/* typeDisplay */}
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <View style={styles.buttonSpace}>
            {showRecordButton}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const camera = state.camera;
  return { camera };
};

const styles = {
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default connect(mapStateToProps, {})(CameraScene);
