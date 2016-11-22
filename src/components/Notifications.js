import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Notification from './Notification';
import GuestView from './GuestView';

export default class Notifications extends Component {
  constructor(props) {
    super(props)

    this.state = {
      refresh: false,
    };
    this.refreshNotifications = this.refreshNotifications.bind(this);
  }
  refreshNotifications(toggle) {
    this.setState({refresh: toggle})
  }
  render() {
    let activeDonationDisplay;
    if (this.props.activeDonation) {
      activeDonationDisplay = <Notification activeDonationDisplay {...this.props} />
    }

    let receivedDonationDisplay;
    if (this.props.recentSuccessfulRequest && this.props.recentSuccessfulRequest.received === 1 && this.props.recentThankYou && this.props.recentThankYou.request_id === this.props.recentSuccessfulRequest.id) {
      // leave receivedDonationDisplay as undefined
    } else if (this.props.recentSuccessfulRequest) {
      receivedDonationDisplay = <Notification receivedDonationDisplay refreshNotifications={this.refreshNotifications} {...this.props} />
    }

    let noNotificationsDisplay;
    if (activeDonationDisplay === undefined && receivedDonationDisplay === undefined) {
      noNotificationsDisplay = <Text>No current notifications.</Text>
    }

    let display;
    if (this.props.user === null) {
      display = <GuestView {...this.props} />
    } else {
      display =
        <View style={styles.wrapper}>
          <View style={styles.half}>
            {activeDonationDisplay}
            {noNotificationsDisplay}
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
