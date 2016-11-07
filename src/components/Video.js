import React, { Component } from 'react';
import { Image, TouchableHighlight, View, Text, StyleSheet } from 'react-native';
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
      console.log("preview in Video");
      content = this.props.videoData.path
    } else if (this.props.anonEntry) {
      console.log("anonEntry in Video");
      console.log("anonEntry", this.props.selectedEntry);
      content = this.props.selectedEntry.video
    } else if (this.props.entryShow) {
      console.log("entryShow in Video");
      content = this.props.entry.video
    } else if (this.props.selectedEntry) {
      console.log("selectedEntry in Video");
      // console.log("props", this.props);
      // console.log("entry", this.props.entry);
      // console.log("selectedEntry", this.props.selectedEntry);
      content = this.props.selectedEntry.video
    } else if (this.props.userRequest) {
      console.log("userRequest in Video");

      content = this.props.selectedRequest.video
    } else if (this.props.requestShow) {
      console.log("requestShow in Video");
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
    } else if (this.props.preview) {
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
    } else if (this.props.requestShow || this.props.entryShow) {
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
    console.log("content", content);
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
    // height: 250,
    // width: 250,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 2,
  },
  video: {
    flex: 1,
    height: null,
    width: null,
    // resizeMode: 'contain',
    // position: 'absolute',
  },
  image: {
    // height: 250,
    // width: 250,
  },
  playButtonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderColor: 'orange',
    borderWidth: 2,
  },
  playButton: {
    width: 50,
    height: 50,
    // top: 100,
    // left: 100,
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
