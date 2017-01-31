import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavBar from '../NavBar';
import SpinningPizza from '../SpinningPizza';

class NotificationsScene extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          leftButton='backButton'
          onLeftPress={Actions.pop}
        />
        <View style={{ flex: 9 }}>
          <Text>NOTIFICATIONS SCENE</Text>
          <SpinningPizza />
        </View>
      </View>
    );
  }
}

export default NotificationsScene;
