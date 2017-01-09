import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import { videoPlayToggle } from '../actions';
import Button from './Button2';

class EntryVideo extends Component {
  render() {
    const { source, paused, videoPlayToggle } = this.props;
    const playButton = (
      <View style={styles.buttonContainer}>
        <Button onPress={() => videoPlayToggle(paused)}>
          <Image source={require('../../assets/mobile-icons/playbutton.png')} />
        </Button>
      </View>
    );
    const videoDisplay = (
      <Video
        source={{ uri: source }}
        paused={paused}
        muted
        playInBackground
        playWhenInactive
        style={{ flex: 1, zIndex: 1 }}
        resizeMode={'contain'}
      />
    );
    return (
      <View style={styles.container}>
        {playButton}
        {videoDisplay}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 4,
  },
  video: {
    borderColor: 'black',
    borderWidth: 2,
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  }
};

const mapStateToProps = state => {
  const { paused } = state.video;
  return { paused };
};

export default connect(mapStateToProps, { videoPlayToggle })(EntryVideo);
