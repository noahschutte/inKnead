import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavBar from '../NavBar';

class ProfileScene extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          onLeftPress={Actions.pop}
          leftButton='backButton'
        />
        <View style={{ flex: 9 }}>
          <Text>PROFILE SCENE</Text>
        </View>
      </View>
    );
  }
}

export default ProfileScene;
