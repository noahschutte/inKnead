import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default class Request extends Component {
  showRequest() {
    if (this.props.anonActivity) {
      const entry = this.props.selectedRequest
      this.props.collectEntry(entry)
      this.props.navigator.push({name: 'entryShow'})
    } else {
      this.props.collectRequest(this.props.selectedRequest)
      this.props.navigator.push({name: 'requestShow'})
    }
  }

  render() {
    let request;
    if (this.props.selectedRequest) {
      request = this.props.selectedRequest;
    } else if (this.props.selectedEntry) {
      request = this.props.selectedEntry
    }

    let requestText;
    if (request.received === undefined) {
      requestText = <Text>Thanks for </Text>
    } else if (this.props.anonActivity && request.donor_id === this.props.anonID) {
      requestText = <Text>Donated </Text>
    } else if (this.props.anonActivity && request.donor_id !== null) {
      requestText = <Text>Received </Text>
    } else if (this.props.anonActivity && request.creator_id === this.props.anonID) {
      requestText = <Text>Requested </Text>
    } else if (this.props.history && request.donor_id === this.props.user.id) {
      requestText = <Text>You Donated </Text>
    } else if (this.props.history && request.creator_id === this.props.user.id && request.donor_id === null) {
      requestText = <Text>You Requested </Text>
    } else if (this.props.history && request.creator_id === this.props.user.id && request.donor_id !== null) {
      requestText = <Text>You Received </Text>
    } else if (request.donor_id) {
      requestText = <Text>Received </Text>
    } else {
      requestText = <Text>Request for </Text>
    }

    let requestPizzas;
    if (request.pizzas === 1) {
      requestPizzas =
      <View style={styles.pizzas}>
        <Image
          style={styles.pizzaImage}
          source={require('../../assets/pizza-icon-for-requests/whole-pizza.png')}
          />
      </View>
    } else if (request.pizzas === 2) {
       requestPizzas =
        <View style={styles.pizzas}>
          <Image
            style={styles.pizzaImage}
            source={require('../../assets/pizza-icon-for-requests/whole-pizza.png')}
            />
          <Image
            style={styles.pizzaImage}
            source={require('../../assets/pizza-icon-for-requests/whole-pizza.png')}
            />
        </View>
    } else {
      requestPizzas =
        <View style={styles.pizzas}>
          <Image
            style={styles.pizzaImage}
            source={require('../../assets/pizza-icon-for-requests/whole-pizza.png')}
            />
          <Image
            style={styles.pizzaImage}
            source={require('../../assets/pizza-icon-for-requests/whole-pizza.png')}
            />
          <Image
            style={styles.pizzaImage}
            source={require('../../assets/pizza-icon-for-requests/whole-pizza.png')}
            />
        </View>
    }

    let timeAgo;
    let displayTime;
    const minutes = Math.round(request.seconds / 60)
    if (minutes === 1) {
      timeAgo = minutes
      displayTime = `${timeAgo} minute ago`
    } else if (minutes < 60) {
      timeAgo = minutes
      displayTime = `${timeAgo} minutes ago`
    } else if (Math.round(minutes/60) === 1) {
      timeAgo = Math.round(minutes/60)
      displayTime = `${timeAgo} hour ago`
    } else if (Math.round(minutes/60) < 24) {
      timeAgo = Math.round(minutes/60)
      displayTime = `${timeAgo} hours ago`
    } else if (Math.round(minutes/1440) === 1) {
      timeAgo = Math.round(minutes/1440)
      displayTime = `${timeAgo} day ago`
    } else {
      timeAgo = Math.round(minutes/1440)
      displayTime = `${timeAgo} days ago`
    }

    const content = this.props.selectedRequest.thumbnail
    const thumbnail =
      <Image
        style={styles.thumbnail}
        source={{ uri: content}}
        />

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showRequest.bind(this)} style={styles.wrapper}>
          <View style={styles.imageContainer}>
            {thumbnail}
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.date}>
              <Text style={styles.dateTime}>
                {displayTime}
              </Text>
            </View>
            <View style={styles.content}>
              {requestText}
              {requestPizzas}
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
  imageContainer: {
    flex: 1,
    margin: 2,
  },
  thumbnail: {
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  infoContainer: {
    flex: 1,
    margin: 5,
  },
  date: {
    alignItems: 'flex-end',
  },
  dateTime: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  pizzaImage: {
    height: 20,
    width: 20,
  },
  pizzas: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
})
