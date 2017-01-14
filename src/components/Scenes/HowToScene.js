import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavBar from '../NavBar';
import HowToSwiper from '../HowToSwiper';

class HowToScene extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          leftButton='backButton'
          onLeftPress={Actions.pop}
        />
        <View style={{ flex: 9 }}>
          <HowToSwiper />
        </View>
      </View>
    );
  }
}

export default HowToScene;
