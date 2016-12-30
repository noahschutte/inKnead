import React, { Component } from 'react';
import { View, Text } from 'react-native';

class NavBar extends Component {

  renderRightButton() {
    return (
      <Text>{this.props.rightButton}</Text>
    );
  }


  render() {
    return (
      <View style={styles.navBarStyle}>
        <Text style={{ flex: 1 }}>Left Button</Text>
        <Text style={styles.titleStyle}>Nav Bar</Text>
        <Text style={{ flex: 1 }}>
          Right Button
        </Text>
      </View>
    );
  }
}

const styles = {
  navBarStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ce0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 4,
  }
};

export default NavBar;
