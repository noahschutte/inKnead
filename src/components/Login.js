import React, { Component } from 'react';
import { View } from 'react-native';
import FBSDK, { AccessToken, LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class Login extends Component {
  createSession(userInfo) {
    fetch('https://in-knead.herokuapp.com/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({userInfo})
    })
    .then((response) => {
      return response.json()})
    .then((responseJson) => {
      this.props.onUserChange(responseJson.user)
      this.props.onEmailChange(responseJson.email)
      if (this.props.guestDonation) {
        this.props.handleGuestDonation(false)
        this.props.navigator.pop();
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  handleLogoutFinished = (error, result) => {
    if (error) {
      alert("Logout failed with error: " + result.error);
    } else {
      this.props.onUserChange(null)
      this.props.collectActiveDonation(null)
      this.props.collectAnonEmail(null)
      this.props.onEmailChange(null)
      this.props.onChangeNewRequestErrorMesssage(null)
      this.props.onChangeVideoData(null)
      this.props.onEmailChange(null)
      this.props.collectUserHistory(null)
    }
  }
  handleLoginFinished = (error, result) => {
    if (error) {
      alert("Login failed with error: " + error.message);
    } else if (result.isCancelled) {
      alert("Login was cancelled");
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          if (data) {
            const accessToken = data.accessToken
            const responseInfoCallback = (error, result) => {
              if (error) {
                alert('Error fetching data: ' + error.toString());
              } else {
                this.createSession(result)
              }
            }
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name'
                  }
                }
              },
              responseInfoCallback
            );
            new GraphRequestManager().addRequest(infoRequest).start()
          }
        }
      )
    }
  }
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["email", "public_profile"]}
          onLogoutFinished={this.handleLogoutFinished}
          onLoginFinished={this.handleLoginFinished}
        />
      </View>
    );
  };
};
