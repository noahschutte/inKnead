import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Notification from './Notification';

export default class Notifications extends Component {
  render() {
    let activeDonationDisplay;
    if (this.props.activeDonation) {
      activeDonationDisplay = <Notification activeDonationDisplay {...this.props} />
    }

    let receivedDonationDisplay;
    // notify the user their request has been donated to
    if (true) {
      receivedDonationDisplay = <Notification receivedDonationDisplay {...this.props} />
    }

    return (
      <View style={styles.container}>
        <Nav backButton {...this.props} />
        <View style={styles.wrapper}>
          <View style={styles.half}>
            {activeDonationDisplay}
          </View>
          <View style={styles.half}>
            {receivedDonationDisplay}
          </View>
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
  half: {
    flex: 1,
  }
})
