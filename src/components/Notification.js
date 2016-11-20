import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import Button from './Button';

export default class Notification extends Component {
  handleInstructions() {
    this.props.navigator.push({name: 'instructions'})
  }
  confirmDonationReceived() {
    console.log("I recieved my donation.");
  }
  denyDonationReceived() {
    Alert.alert(
      'No luck yet?',
      'Check your email again in another 30 minutes.',
      [
        {text: 'Okay.', onPress: () => console.log('OK Pressed')},
      ]
    )
  }
  onCreateThankYouPress() {
    this.props.navigator.push({name: 'createThankYou'})
  }

  render() {
    let display;
    if (this.props.activeDonationDisplay) {
      display =
        <View style={styles.wrapper}>
          <Button
            text="Complete your recent donation now."
            backgroundColor="green"
            onPress={this.handleInstructions.bind(this)}
            />
        </View>
    } else if (!this.props.receivedDonationDisplay) {
      display =
        <View style={styles.wrapper}>
          <Text>
            Please go check your email now.
          </Text>
          <Text>
            Did you receive your donation by email yet?
          </Text>
          <Button
            text="Yes!"
            backgroundColor="green"
            onPress={this.confirmDonationReceived.bind(this)}
            />
          <Button
            text="Not yet..."
            backgroundColor="green"
            onPress={this.denyDonationReceived.bind(this)}
            />
        </View>
    } else if (true) {
      display =
        <View style={styles.wrapper}>
          <Text>
            Awesome Sauce!
          </Text>
          <Text>
            Are you ready to send a "Thank you" video now?
          </Text>
          <Button
            text="Heck Yeah!"
            backgroundColor="green"
            onPress={this.onCreateThankYouPress.bind(this)}
            />
        </View>
    }

    return (
      <View style={styles.container}>
        {display}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 2,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
