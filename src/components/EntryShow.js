import React, { Component } from 'react';
import { AlertIOS, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Video from './Video';
import Button from './Button';

export default class EntryShow extends Component {
  handleInstructions() {
    this.props.navigator.push({name: 'instructions'})
  }
  render() {
    let request = this.props.request;
    let activeDonation;

    if (this.props.activeDonation) {
      activeDonation =
      <View style={styles.instructionsContainer}>
        <Button
          text="Complete your recent donation now."
          backgroundColor='green'
          onPress={this.handleInstructions.bind(this)}
          />
      </View>
    }

    let timeAgo;
    let displayTime;
    if (request.minutes === 1) {
      timeAgo = request.minutes
      displayTime = `${timeAgo} minute ago`
    } else if (request.minutes < 60) {
      timeAgo = request.minutes
      displayTime = `${timeAgo} minutes ago`
    } else if (Math.round(request.minutes/60) === 1) {
      timeAgo = Math.round(request.minutes/60)
      displayTime = `${timeAgo} hour ago`
    } else if (Math.round(request.minutes/60) < 24) {
      timeAgo = Math.round(request.minutes/60)
      displayTime = `${timeAgo} hours ago`
    } else if (Math.round(request.minutes/1440) === 1) {
      timeAgo = Math.round(request.minutes/1440)
      displayTime = `${timeAgo} day ago`
    } else {
      timeAgo = Math.round(request.minutes/1440)
      displayTime = `${timeAgo} days ago`
    }

    return (
      <View style={styles.container}>
        <Nav backButton {...this.props} />
        <View style={styles.wrapper}>
          <Video entryShow {...this.props} />
          <View style={styles.content}>
            <View style={styles.videoFooter}>
              <Text style={styles.dateTime}>
                {displayTime}
              </Text>
            </View>
            <View style={styles.banner}>
              <Text style={styles.bannerText}>
                REQUESTED
              </Text>
            </View>
            <Text style={{textAlign: 'center'}}>
              (Image Placeholder)
            </Text>
            <View style={styles.banner}>
              <Text style={styles.bannerText}>
                VENDOR
              </Text>
            </View>
            <Text style={{textAlign: 'center'}}>
              (Image Placeholder)
            </Text>
            {activeDonation}
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
  content: {
    flex: 1,
    borderColor: 'green',
    borderWidth: 2,
  },
  videoFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: 'purple',
    borderWidth: 2,
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  bannerText: {
    color: 'white',
  },
  header: {
    justifyContent: 'center',
    // borderWidth: 2,
  },
  firstName: {
    textAlign: 'center',
    color: '#ce0000',
    fontSize: 25,
    fontWeight: 'bold',
    // borderWidth: 3,
  },
  dateTime: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  request: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    // borderWidth: 3,
    borderColor: 'green',
  },
  donationButtonContainer: {
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 2,
  },
  donateButton: {
    width: 200,
    height: 100,
  },
  disabledDonateButton: {
    width: 200,
    height: 100,
    opacity: .3,
  },
  received: {
    position: 'absolute',
    zIndex: 1,
    width: 150,
    height: 150,
    left: 100,
  },
  instructionsContainer: {
    // zIndex: 1,
    // flex: 1,
    // borderWidth: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 15,
    // borderRadius: 5,
    // borderColor: 'green',
    // backgroundColor: 'green',
  },
  instructions: {
    // flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    // padding: 5,
  },
  errorMessageContainer: {
    borderColor: 'blue',
    borderWidth: 3,
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
})
