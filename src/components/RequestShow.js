import React, { Component } from 'react';
import { AlertIOS, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Video from './Video';
import Button from './Button';

export default class RequestShow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errorMessage: '',
    }
  }
  onDonatePress(request) {
    if (this.props.user === null) {
      this.props.handleGuestDonation(true)
      this.props.navigator.push({name: 'profile'})
      // this.props.changeDisplay('profile')
    } else if (this.props.user.id === this.props.request.creator_id) {
      this.setState({errorMessage: 'Really, you want to donate to yourself?'})
    } else if (this.props.activeDonation) {
      this.setState({errorMessage: 'You have recently made a donation.'})
    } else {
      AlertIOS.alert(
        `Are you sure you want to donate ${request.pizzas} pizza(s)?`,
        `You will have 30 minutes to send an online gift card. Failure to complete the donation could have you removed from the community.`,
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Donate',
            onPress: this.onConfirmPress.bind(this, request),
          }
        ]
      )
    }
  }
  onConfirmPress(request) {
    const userID = this.props.user.id;
    fetch(`https://in-knead.herokuapp.com/requests/${request.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({userID})
    })
    .then((response) => {
      return response.json()})
    .then((responseJson) => {
      if (responseJson.errorMessage) {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.props.collectRequests(responseJson.requests)
        this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
        this.props.collectActiveDonation(request)
        this.props.collectAnonEmail(responseJson.anonEmail)
        this.setState({errorMessage: ' '})
        this.props.navigator.push({name: 'instructions'})
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  handleInstructions() {
    this.props.navigator.push({name: 'instructions'})
  }
  showAnonHistory() {
    this.props.selectAnon(this.props.request.creator_id)
    this.props.navigator.push({name: 'anonHistory'})
  }
  render() {
    let hasDonor;
    let showDonateButton;
    let request = this.props.request;
    let activeDonation;

    if (request.donor_id) {
      hasDonor =
        <Image
          style={styles.received}
          source={require('../../assets/received.png')}
          />
      showDonateButton =
        <Image
          style={styles.disabledDonateButton}
          source={require('../../assets/donate.png')}
          />
    } else if (this.props.user === null || this.props.user.id === request.creator_id || this.props.activeDonation) {
      showDonateButton =
        <TouchableOpacity onPress={this.onDonatePress.bind(this)} >
          <Image
            style={styles.disabledDonateButton}
            source={require('../../assets/donate.png')}
            />
        </TouchableOpacity>
    } else {
      showDonateButton =
      <TouchableOpacity onPress={this.onDonatePress.bind(this, request)} >
        <Image
          style={styles.donateButton}
          source={require('../../assets/donate.png')}
          />
      </TouchableOpacity>
    }

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

          <View style={styles.videoContainer}>
            <Video requestShow {...this.props} />
          </View>

          <View style={styles.content}>

            <View style={styles.videoFooter}>
              <Text style={styles.dateTime}>
                {displayTime}
              </Text>
              <TouchableOpacity onPress={this.showAnonHistory.bind(this)} >
                <Text style={styles.history}>
                  User History
                </Text>
              </TouchableOpacity>
              <View>
                <Text>
                  (3 Dots)
                </Text>
              </View>
            </View>

            <View style={styles.banner}>
              <Text style={styles.bannerText}>
                REQUESTED
              </Text>
            </View>

            <View style={styles.pizzaPlaceholder}>
              <Text style={{textAlign: 'center'}}>
                (Image Placeholder)
              </Text>
            </View>

            <View style={styles.banner}>
              <Text style={styles.bannerText}>
                VENDOR
              </Text>
            </View>

            <View style={styles.logoPlaceholder}>
              <Text style={{textAlign: 'center'}}>
                (Image Placeholder)
              </Text>
            </View>

            {hasDonor}
            <View style={styles.bottomHalf}>
              <View style={styles.donationButtonContainer}>
                {showDonateButton}
              </View>

              <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessage}>
                  {this.state.errorMessage}
                </Text>
              </View>

              <View >
                {activeDonation}
              </View>
            </View>
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
    backgroundColor: 'white',
  },
  videoContainer: {
    flex: 2,
  },
  content: {
    flex: 3,
  },
  videoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  history: {
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#424242',
    alignSelf: 'stretch',
    padding: 5
  },
  bannerText: {
    color: 'white',
  },
  bottomHalf: {
    padding: 20,
  },
  dateTime: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
  },
  donationButtonContainer: {
    alignItems: 'center',
    paddingTop: 10,
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
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessageContainer: {
    marginTop: 20,
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
  pizzaPlaceholder: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  logoPlaceholder: {
    paddingTop: 5,
    paddingBottom: 5,
  },
})
