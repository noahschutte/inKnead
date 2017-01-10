import React from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import Video from 'react-native-video';
import { playButtonImage } from '../assets';

const EntryVideo = (props) => {
    const { source, paused, togglePlay } = props;
    const originPaused = paused;
    let playButton;

    if (paused) {
      playButton = (
        <Image
          source={playButtonImage}
          style={styles.playButton}
        />
      );
    } else {
      playButton = (
        <Image
          style={styles.playButton}
        />
      );
    }

    const videoDisplay =
      (<Video
        source={{ uri: source }}
        paused={originPaused}
        rate={1.0}
        volume={1}
        muted={false}
        playInBackground
        playWhenInactive
        resizeMode={'contain'}
        onEnd={() => togglePlay(false)}
        style={styles.video}
      />);

    const display =
        (<View style={styles.wrapper}>
          <TouchableHighlight
            style={styles.playButtonContainer}
            onPress={() => togglePlay(!paused)}
          >
            {playButton}
          </TouchableHighlight>
          {videoDisplay}
        </View>);
    return (
      <View style={styles.container}>
        {display}
      </View>
    );
  };

const styles = {
  container: {
    flex: 4,
    backgroundColor: 'black',
  },
  wrapper: {
    flex: 1,
    zIndex: 1,
  },
  video: {
    flex: 1,
    zIndex: 2,
  },
  playButtonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  playButton: {
    width: 50,
    height: 50,
  },
};

export default EntryVideo;
