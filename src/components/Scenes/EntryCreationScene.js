import React, { Component } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  updateSelectedPizzas,
  updateSelectedVendor,
} from '../../actions';
import { camcorderImage } from '../../assets';
import NavBar from '../NavBar';
// import EntryVideo from '../EntryVideo';
import EntryCreationForm from '../EntryCreationForm';
import Button from '../Button2';

class EntryCreationScene extends Component {
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
      return <Text>Video Data exists</Text>;
    }
    return (
      <Button onPress={this.openVideoRec}>
        <Image
          source={camcorderImage}
          style={{ resizeMode: 'contain', height: 75, width: 75 }}
        />
      </Button>
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
          <View style={{ flex: 3.5, alignItems: 'center', justifyContent: 'center' }}>
            {videoDisplay}
          </View>
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

const mapStateToProps = ({ newEntry }) => {
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
  return {
    pizzas,
    vendor,
    videoKey,
    uploading,
    progress,
    paused,
    uploadPercentage,
    uploadStatus
  };
};

export default connect(mapStateToProps, {
  updateSelectedPizzas,
  updateSelectedVendor
})(EntryCreationScene);
