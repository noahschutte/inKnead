import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Video from './Video';

export default class Request extends Component {
  showRequest() {
    this.props.collectRequest(this.props.selectedRequest)
    this.props.navigator.push({name: 'requestShow'})
  }

  render() {
    let request = this.props.selectedRequest;

    let requestText;
    if (request.pizzas === 1) {
      requestText =
      <View style={styles.pizzas}>
        <Image
          style={styles.pizzaImage}
          source={require('../../assets/playButton.png')}
          />
      </View>
    } else if (request.pizzas === 2) {
       requestText =
        <View style={styles.pizzas}>
          <Image
            style={styles.pizzaImage}
            source={require('../../assets/playButton.png')}
            />
          <Image
            style={styles.pizzaImage}
            source={require('../../assets/playButton.png')}
            />
        </View>
    } else {
      requestText =
        <View style={styles.pizzas}>
          <Image
            style={styles.pizzaImage}
            source={require('../../assets/playButton.png')}
            />
          <Image
            style={styles.pizzaImage}
            source={require('../../assets/playButton.png')}
            />
          <Image
            style={styles.pizzaImage}
            source={require('../../assets/playButton.png')}
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
        <TouchableOpacity onPress={this.showRequest.bind(this)} style={styles.wrapper}>
          <View style={styles.videoContainer}>
            <Video userRequest {...this.props} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.header}>
              <View style={styles.date}>
                <Text style={styles.dateTime}>
                  {displayTime}
                </Text>
              </View>
              {requestText}
            </View>
          </View>
          <View>

          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#BDBDBD',
    borderTopColor: '#BDBDBD',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  videoContainer: {
    flex: 1,
    margin: 5,
  },
  infoContainer: {
    flex: 1,
    margin: 5,
  },
  header: {
    justifyContent: 'center',
  },
  date: {
    alignItems: 'flex-end'
  },
  dateTime: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
  },
  pizzaImage: {
    height: 50,
    width: 50,
  },
  pizzas: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
})
