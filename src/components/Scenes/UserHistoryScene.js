import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavBar from '../NavBar';

class UserHistoryScene extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          leftButton='backButton'
          onLeftPress={Actions.pop}
        />
        <View style={{ flex: 9 }}>
          <Text>USER HISTORY SCENE</Text>
        </View>
      </View>
    );
  }
}

export default UserHistoryScene;
