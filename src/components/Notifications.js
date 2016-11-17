import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Notification from './Notification';

export default class Notifications extends Component {
  render() {
    let display;
    if (!this.props.activeDonation) {
      display = <Notification {...this.props} />
    }
    return (
      <View style={styles.container}>
        <Nav backButton {...this.props} />
        <View style={styles.wrapper}>
          <Text>
            Notifications
          </Text>
          {display}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 9,
  },
})
