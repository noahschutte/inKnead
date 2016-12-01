import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import Button from './Button';
import LoginContainer from './LoginContainer';
import Nav from './Nav';
import GuestView from './GuestView';

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      verify: null,
      updatedEmail: '',
      errorMessage: ' '
    };
    this.onCurrentEmailChange = this.onCurrentEmailChange.bind(this);
  }
  onCurrentEmailChange(updatedEmail) {
    this.setState({updatedEmail})
  }
  verifyEmail() {
    const userID = this.props.user.id
    const updatedEmail = this.props.user.signup_email;
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/users/${userID}`, {
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
      if (responseJson.currentEmail) {
        this.props.onUserChange(responseJson.user)
        this.props.onCurrentEmailChange(responseJson.currentEmail)
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
  onUpdateEmailPress() {
    const userID = this.props.user.id
    const { updatedEmail } = this.state;
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/users/${userID}`, {
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
      if (responseJson.currentEmail) {
        this.props.onUserChange(responseJson.user)
        this.props.onCurrentEmailChange(responseJson.currentEmail)
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
    let emailDisplay
    if (this.props.user && this.props.user.current_email === null) {
      emailDisplay =
        <View style={styles.profileContainer}>
          <View style={styles.updateEmailDisplay}>
            <Text>Your facebook account was tied to: {this.props.user.signupEmail}</Text>
            <Text>Would you like to verify this email or enter a different one?</Text>
            <Button
              text={'Verify'}
              onPress={this.verifyEmail.bind(this)}
              style={styles.updatedEmailButton}
              {...this.props} />
          </View>
        </View>
    } else {
      emailDisplay =
        <View style={styles.profileContainer}>
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
                onChangeText={this.onCurrentEmailChange}
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
        </View>
    }

    let display;
    if (!this.props.user) {
      display = <GuestView {...this.props} />
    } else {
      display =
        <View style={styles.wrapper}>
          <View style={styles.half}>
            {emailDisplay}
          </View>

          <View style={styles.half}>
            <View style={styles.loginContainer}>
              <LoginContainer
              onUserChange={this.props.onUserChange}
              navigator={this.props.navigator}
              {...this.props}
              />
            </View>
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
    alignItems: 'center',
    backgroundColor: 'white',
  },
  updateEmailDisplay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionsContainer: {
    height: 100,
  },
  emailContainer: {
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
    fontStyle: 'italic',
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
    borderWidth: 1,
    borderColor: 'black',
  },
  currentEmailContainer: {
  },
  currentEmail: {
    marginTop: 5,
    marginBottom: 5,
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
    width: 100,
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
    height: 40,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    color: '#ce0000',
    fontWeight: 'bold',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  half: {
    flex: 1,
  },
});
