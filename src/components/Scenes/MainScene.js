import React, { Component } from 'react';
import { View, Text } from 'react-native';
import NavBar from '../NavBar';


class MainScene extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          rightButton='newRequest'
          leftButton='sideMenu'
          title='Main'
        />
        <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Main Scene</Text>
        </View>
      </View>
    );
  }
}

export default MainScene;
