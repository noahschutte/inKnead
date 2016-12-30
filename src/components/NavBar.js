import React, { Component } from 'react';
import { View, Text } from 'react-native';

class NavBar extends Component {

  render() {
    return (
      <View style={styles.navBarStyle}>
        <Text style={styles.titleStyle}>Nav Bar</Text>
      </View>
    );
  }
}

const styles = {
  navBarStyle: {
    flex: 1,
    backgroundColor: '#ce0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    color: '#fff',
    fontWeight: 'bold',
  }
};

export default NavBar;
