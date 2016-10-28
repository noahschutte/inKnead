import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Menu Page
        </Text>
        <Text style={styles.instructions}>
          Link and Shit
        </Text>
        <Text style={styles.instructions}>
          Another Link
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'yellow',
    borderWidth: 3,
  },
})
