import React, { Component } from 'react';
import { View, Image, Platform } from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  updateSelectedPizzas,
  updateSelectedVendor,
  uploadProgress,
  uploadComplete,
  handleVideoData,
  handleErrors,
  resetCameraState,
} from '../../actions';
import { camcorderImage } from '../../assets';
import NavBar from '../NavBar';
import EntryVideo from '../EntryVideo';
import EntryCreationForm from '../EntryCreationForm';
import Button from '../Button2';

class EntryCreationScene extends Component {
  constructor() {
    super();

    this.state = {
      paused: true,
    };
  }
  onPress = () => {
    this.setState({ paused: true });
    this.handleRequestSubmission();
  }
  togglePlay = (toggle) => {
    this.setState({ paused: toggle });
  }
  dispatchRequest = () => {
    const {
      userData,
      videoData,
      pizzas,
      vendor,
      handleVideoData,
      uploadComplete,
    } = this.props;
    const videoKey = `${Date.now() + userData.fb_userID}`;
    const file = {
      uri: videoData.path,
      name: videoKey,
      type: 'video/quicktime'
    };
    fetch('https://d1dpbg9jbgrqy5.cloudfront.net/requests', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        userID: userData.id,
        pizzas,
        vendor,
        videoKey
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorMessage) {
        console.log(responseJson.errorMessage);
      } else {
        const url = responseJson.signedRequest;
        const xhr = new XMLHttpRequest();
        // Add event listeners. Needs upload Progress
        xhr.addEventListener('load', uploadComplete, false);
        xhr.addEventListener('error', (evt) => console.log('Error:', evt), false);
        xhr.addEventListener('abort', (evt) => console.log(evt), false);
        const that = this;
        Actions.UploadingScene();
        xhr.open('PUT', url);
        // Explicitly set request header for android compatibility
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('success');
              handleVideoData(null);
              Actions.MainScene({ type: 'reset' });
            } else {
              console.log('failure');
              fetch('https://d1dpbg9jbgrqy5.cloudfront.net/requests/1', {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify({ videoKey })
              })
              .catch((error) => {
                console.error(error);
              });
              that.setState({ uploading: false });
            }
          }
        };
        xhr.send(file);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  handleRequestSubmission = () => {
    const { videoData, pizzas, vendor, handleErrors } = this.props;
    const errorMessages = [];
    if (!videoData) {
      errorMessages.push('Please record a video.');
    }
    if (pizzas === 0) {
      errorMessages.push('Please select how many pizzas you need.');
    }
    if (vendor === '') {
      errorMessages.push('Please choose a preferred pizza place.');
    }
    handleErrors(errorMessages);
    if (errorMessages.length === 0) {
      this.dispatchRequest();
    }
  }
  openVideoRec = () => {
    this.props.resetCameraState();
    if (Platform.OS === 'ios') {
      Camera.checkDeviceAuthorizationStatus()
      .then(response => {
        if (response) {
          Actions.CameraScene();
        } else {
          alert('You must allow camera access!');
        }
      });
    } else if (Platform.OS === 'android') {
      Actions.CameraScene();
    }
  }

  renderVideoContent = () => {
    if (this.props.videoData) {
      return (
        <EntryVideo
          rerecordable
          togglePlay={this.togglePlay}
          source={this.props.videoData.path}
          paused={this.state.paused}
        />
      );
    }
    return (
      <View style={styles.videoContainer} >
        <Button onPress={this.openVideoRec}>
          <Image
            source={camcorderImage}
            style={{ resizeMode: 'contain', height: 75, width: 75 }}
          />
        </Button>
      </View>
    );
  }

  render() {
    const {
      pizzas,
      updateSelectedPizzas,
      vendor,
      updateSelectedVendor,
    } = this.props;
    const videoDisplay = this.renderVideoContent();
    return (
      <View style={{ flex: 1 }} >
        <NavBar
          leftButton='backButton'
          onLeftPress={Actions.pop}
        />
        <View style={{ flex: 9 }}>
          {videoDisplay}
          <EntryCreationForm
            updateSelectedPizzas={updateSelectedPizzas}
            pizzas={pizzas}
            updateSelectedVendor={updateSelectedVendor}
            vendor={vendor}
            handleRequestSubmission={this.handleRequestSubmission}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  videoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
};

const mapStateToProps = ({ newEntry, camera, user }) => {
  const {
    pizzas,
    vendor,
    videoKey,
    uploading,
    uploadPercentage,
    errorMessages,
  } = newEntry;
  const { videoData } = camera;
  const { userData } = user;
  return {
    pizzas,
    vendor,
    videoKey,
    uploading,
    uploadPercentage,
    errorMessages,
    videoData,
    userData
  };
};

export default connect(mapStateToProps, {
  updateSelectedPizzas,
  updateSelectedVendor,
  uploadProgress,
  uploadComplete,
  handleVideoData,
  handleErrors,
  resetCameraState,
})(EntryCreationScene);
