import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  },
  videoFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bannerText: {
    color: 'white',
  },
  dateTime: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
