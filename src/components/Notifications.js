import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Notification from './Notification';
import GuestView from './GuestView';

export default class Notifications extends Component {
  render() {
    let activeDonationDisplay;
    if (this.props.activeDonation) {
      activeDonationDisplay = <Notification activeDonationDisplay {...this.props} />
    }

    let receivedDonationDisplay;
    if (this.props.recentSuccessfulRequest) {
      receivedDonationDisplay = <Notification receivedDonationDisplay {...this.props} />
    }
    let display;
    if (this.props.user === null) {
      display = <GuestView {...this.props} />
    } else {
      display =
        <View style={styles.wrapper}>
          <View style={styles.half}>
            {activeDonationDisplay}
          </View>
          <View style={styles.half}>
            {receivedDonationDisplay}
          </View>
        </View>
    }
    return (
      <View style={styles.container}>
        <Nav backButton {...this.props} />
        {display}
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
