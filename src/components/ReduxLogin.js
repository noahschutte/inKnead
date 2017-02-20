import React, { Component } from 'react';
import { View } from 'react-native';
import {
  AccessToken,
  LoginButton,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createSession, redirectTo } from '../actions';

class ReduxLogin extends Component {
  handleLogoutFinished = (error, result) => {
    if (error) {
      alert(`Logout failed with error: ${result.error}`);
    } else {
      Actions.root();
      Actions.refresh({ key: 'MainScene', logOut: true });
    }
  }
  handleLoginFinished = (error, result) => {
    if (error) {
      alert(`Login failed with error ${error}`);
    } else if (result.isCancelled) {
      alert('Login was cancelled');
    } else {
      AccessToken.getCurrentAccessToken().then(
        data => {
          if (data) {
            const accessToken = data.accessToken;
            const responseInfoCallback = (error, result) => {
              if (error) {
                alert(`Error fetching data: ${error.toString()}`);
              } else {
                this.props.createSession(result, this.props.redirect);
              }
            };
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
            new GraphRequestManager().addRequest(infoRequest).start();
          }
        }
      );
    }
  }

  render() {
    return (
      <View style={{ margin: 10 }}>
        <LoginButton
          readPermissions={['email', 'public_profile']}
          onLogoutFinished={this.handleLogoutFinished}
          onLoginFinished={this.handleLoginFinished}
        />
      </View>
    );
  }
}

export default connect(null, { createSession, redirectTo })(ReduxLogin);
