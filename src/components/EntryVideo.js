import React, { Component } from 'react';
import { Text, Image, View, TouchableHighlight } from 'react-native';
import Video from 'react-native-video';

class EntryVideo extends Component {
  componentWillReceiveProps() {
    console.log('props received');
  }

  // playButtonHelper = () => {
  //   const { paused, togglePlay } = this.props;
  //   if (this.props.paused) {
  //     return (
  //       <View style={styles.buttonContainer}>
  //         <Button onPress={() => togglePlay(paused)}>
  //           <Image source={require('../../assets/mobile-icons/playbutton.png')} />
  //         </Button>
  //       </View>
  //     );
  //   }
  //   return (
  //     <TouchableHighlight style={styles.buttonContainer} onPress={() => console.log('here')}>
  //       <Image source={require('../../assets/mobile-icons/playbutton.png')} />
  //     </TouchableHighlight>
  //   );
  // }

  render() {
    console.log('rendered, this', this);
    console.log('rendered, props', this.props);
    const { source, paused, togglePlay } = this.props;
    // let playButtonChild;
    // if (paused) {
    //   playButtonChild = <Image source={require('../../assets/mobile-icons/playbutton.png')} />;
    // } else {
    //   playButtonChild = <Image />;
    // }
    let playButton;
    if (paused) {
      playButton = (
          <Image
            style={{ width: 50, height: 50 }}
            source={require('../../assets/mobile-icons/playbutton.png')}
          />
      );
    } else {
      playButton = (
        <Image style={{ width: 50, height: 50 }} />
      );
    }


    const videoDisplay = (
      <Video
        source={{ uri: source }}
        paused={paused}
        muted={false}
        volume={1}
        playInBackground
        playWhenInactive
        style={{ flex: 1, zIndex: 2 }}
        resizeMode={'contain'}
        onEnd={() => togglePlay(false)}
      />
    );

    const display = (
      <View style={{ flex: 1, zIndex: 1 }}>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => togglePlay(paused)}
        >
            {playButton}
        </TouchableHighlight>
        {videoDisplay}
      </View>
    );

    return (
      <View style={styles.container}>
        {display}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 4,
    zIndex: 1
  },
  video: {
    // borderColor: 'black',
    // borderWidth: 2,
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
    // borderColor: 'red',
    // borderWidth: 3,
  },
};

export default EntryVideo;
