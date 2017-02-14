import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class EmailVerifyScene extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.signupEmail}</Text>
      </View>
    );
  }
}

export default EmailVerifyScene;
