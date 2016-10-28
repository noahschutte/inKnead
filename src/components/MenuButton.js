import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default class MenuButton extends Component {
  onMenuPress() {
  }
  render() {
    console.log("isOpen", this.props.isOpen);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.toggleMenu}>
          <Image
            style={styles.menuButton}
            source={require('../../assets/menuButton.png')}
            />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 3,
  },
  menuButton: {
    height: 40,
    width: 40,
  },
})
