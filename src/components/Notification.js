import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Notification extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          You have recently made a donation.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 2,
  },
})
