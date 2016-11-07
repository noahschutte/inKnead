import React, { Component } from 'react';
import { AlertIOS, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Video from './Video';

export default class Entry extends Component {
  handleInstructions() {
    this.props.navigator.push({name: 'instructions'})
  }
  showEntry() {
    const entry = this.props.selectedEntry
    this.props.collectEntry(entry)
    this.props.navigator.push({name: 'entryShow'})
  }

  render() {
    let request = this.props.selectedEntry;

    let action;
    // if the user is the same as the request's creator
    if (request.creator_id === this.props.anonID) {
      action = "requested"
    } else if (request.donor_id === this.props.anonID) {
      action = "donated"
    }

    let requestText;
    if (request.pizzas > 1) {
      requestText =
        <Text style={styles.request}>
          {request.pizzas} pizzas from {request.vendor}
        </Text>
    } else {
      requestText =
        <Text style={styles.request}>
          {request.pizzas} pizza from {request.vendor}
        </Text>
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
        <TouchableOpacity onPress={this.showEntry.bind(this)} style={styles.wrapper}>
          <View style={styles.videoContainer}>
            <Video anonEntry {...this.props} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.header}>
              <Text style={styles.anon}>
                Anon {action}
              </Text>
                {requestText}
              <Text style={styles.dateTime}>
                {displayTime}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'yellow',
    borderWidth: 3,
  },
  videoContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    // borderWidth: 2,
  },
  anon: {
    flex: 1,
    textAlign: 'center',
    color: '#ce0000',
    fontSize: 25,
    fontWeight: 'bold',
    // borderWidth: 3,
  },
  dateTime: {
    flex: 1,
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
    borderWidth: 1,
    // marginTop: 15,
    // borderRadius: 5,
    borderColor: 'green',
    // backgroundColor: 'green',
  },
  instructions: {
    // flex: 1,
    // textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    // padding: 5,
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
})
