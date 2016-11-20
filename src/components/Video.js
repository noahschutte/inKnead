import React, { Component } from 'react';
import { Image, TouchableHighlight, View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

export default class VideoDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      paused: true
    };
    this.playVideo = this.playVideo.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  playVideo() {
    this.setState({paused: !this.state.paused});
  }
  onEnd() {
    this.setState({paused: true});
  }

  render() {
    let content;
    if (this.props.preview) {
      console.log("video preview props", this.props.videoData.path);
      content = this.props.videoData.path
    } else if (this.props.thankYou) {
      console.log("video thankYou props", this.props.thankYouData.path);
      content = this.props.thankYouData.path
    } else if (this.props.anonEntry) {
      content = this.props.selectedEntry.video
    } else if (this.props.entryShow) {
      content = this.props.entry.video
    } else if (this.props.selectedEntry) {
      content = this.props.selectedEntry.video
    } else if (this.props.userRequest) {
      content = this.props.selectedRequest.video
    } else if (this.props.requestShow) {
      content = this.props.request.video
    }

    const videoDisplay = <Video
      source={{ uri: content }}
      paused={this.state.paused}
      rate={1.0}
      volume={1}
      muted={false}
      playInBackground={true}
      playWhenInactive={true}
      resizeMode={'contain'}
      onEnd={this.onEnd}
      repeat={true}
      style={styles.video}
      />;
    let playButton;
    if (this.state.paused) {
      playButton =
        <Image
          source={require('../../assets/playButton.png')}
          style={styles.playButton}
          />
    } else {
      playButton =
        <Image
          style={styles.playButton}
          />
    }
    let display;
    if (this.props.userRequest || this.props.anonEntry) {
      display = videoDisplay
    } else if (this.props.preview || this.props.requestShow || this.props.entryShow || this.props.thankYouData) {
      display =
        <View style={styles.container}>
          <TouchableHighlight
            style={styles.playButtonContainer}
            onPress={this.playVideo}
            >
            {playButton}
          </TouchableHighlight>
          {videoDisplay}
        </View>
    }
    return (
      <View style={styles.container}>
        {display}
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
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
});
