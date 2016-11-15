import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Button from './Button';
import LoginContainer from './LoginContainer';
import Nav from './Nav';
import GuestView from './GuestView';

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      updatedEmail: '',
      errorMessage: ' '
    };
    this.onEmailChange = this.onEmailChange.bind(this);
  }
  onEmailChange(updatedEmail) {
    this.setState({updatedEmail})
  }
  onUpdateEmailPress() {
    const userID = this.props.user.id
    const { updatedEmail } = this.state;
    fetch(`https://in-knead.herokuapp.com/users/${userID}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({updatedEmail})
    })
    .then((response) => {
      return response.json()})
    .then((responseJson) => {
      if (responseJson.email) {
        this.props.onEmailChange(responseJson.email)
        this.setState({updatedEmail: ''})
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.setState({errorMessage: responseJson.errorMessage})
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    let display;
    if (this.props.user === null) {
      display = <GuestView {...this.props} />
    } else {
      display =
        <View style={styles.wrapper}>

          <View style={styles.profileContainer}>
            <Image
              source={require('../../assets/profile.png')}
              style={styles.image}
              />
          </View>
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructions}>
              Make sure your email is updated below.{"\n"}If you make a request, a donor will send{"\n"}a gift card to the email address{"\n"}that is listed below.
            </Text>
          </View>

          <View style={styles.emailContainer}>
            <View style={styles.currentEmail}>
              <Text style={styles.title}>
                Current Email:
              </Text>

              <View style={styles.currentEmailContainer}>
                <Text style={styles.email}>
                  {this.props.currentEmail}
                </Text>
              </View>
            </View>

            <View style={styles.updateEmail}>
              <Text style={styles.title}>
                Update Email:
              </Text>

              <TextInput
                onChangeText={this.onEmailChange}
                maxLength = {254}
                autoCorrect={false}
                autoCapitalize = "none"
                value={this.state.updatedEmail}
                style={styles.input}
                />

            </View>
          </View>

          <View style={styles.errorContainer}>
            <Text style={styles.error}>
              {this.state.errorMessage}
            </Text>
          </View>

          <View style={styles.updatedEmailButtonContainer}>
            <Button
              style={styles.updatedEmailButton}
              text={'Submit'}
              onPress={this.onUpdateEmailPress.bind(this)}
              />
          </View>

          <View style={styles.loginContainer}>
            <LoginContainer
            onUserChange={this.props.onUserChange}
            navigator={this.props.navigator}
            {...this.props}
            />
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
    // borderWidth: 3,
  },
  wrapper: {
    flex: 9,
    alignItems: 'center',
    // justifyContent: 'space-around',
    backgroundColor: 'white',
    // justifyContent: 'space-around',
    // borderColor: 'green',
    // borderWidth: 3,
  },
  profileContainer: {
    flex: 1,
    paddingTop: 10,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  instructionsContainer: {
    flex: 1,
    // width: 250,
  },
  emailContainer: {
    flex: 1,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
  },
  instructions: {
    textAlign: 'center',
    fontFamily: 'Gillsans',
    fontSize: 20,
    fontStyle: 'italic'
  },
  input: {
    fontSize: 15,
    padding: 4,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 250,
    alignSelf: 'center',
    textAlign: 'center',
  },
  currentEmailContainer: {
    flex: 1,
    // alignItems: 'stretch',
    // backgroundColor: 'white'
  },
  currentEmail: {
    marginTop: 30,
    marginBottom: 30,
    // alignItems: 'center',
  },
  updateEmail: {
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Gillsans',
    fontSize: 20,
  },
  updatedEmailButtonContainer: {
    marginBottom: 50,
    width: 100,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  updatedEmailButton: {

  },
  email: {
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Gillsans',
    fontSize: 20,
  },
  errorContainer: {
    // height: 40,
    flex: 1,
    // borderColor: 'blue',
    // borderWidth: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    color: '#ce0000',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
  },
});
