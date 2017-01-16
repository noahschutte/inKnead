import React, { Component } from 'react';
import { View, Image, Platform } from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  updateSelectedPizzas,
  updateSelectedVendor,
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
  togglePlay = (toggle) => {
    this.setState({ paused: toggle });
  }

  openVideoRec = () => {
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
          />
        </View>
      </View>
    );
  }
}

const styles = {
  videoContainer: {
    flex: 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
};

const mapStateToProps = ({ newEntry, camera }) => {
  const {
    pizzas,
    vendor,
    videoKey,
    uploading,
    progress,
    paused,
    uploadPercentage,
    uploadStatus,
  } = newEntry;
  const { videoData } = camera;
  return {
    pizzas,
    vendor,
    videoKey,
    uploading,
    progress,
    paused,
    uploadPercentage,
    uploadStatus,
    videoData,
  };
};

export default connect(mapStateToProps, {
  updateSelectedPizzas,
  updateSelectedVendor
})(EntryCreationScene);
