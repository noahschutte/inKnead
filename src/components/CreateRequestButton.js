import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default class createRequestButton extends Component {
  onNewRequestPress() {
    this.props.navigator.push({name: 'newRequest'});
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onNewRequestPress.bind(this)}>
          <Image
            style={styles.createRequestButton}
            source={require('../../assets/add.png')}
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
  createRequestButton: {
    height: 40,
    width: 40,
  },
})
