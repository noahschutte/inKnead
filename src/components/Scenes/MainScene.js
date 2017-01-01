import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { getEntries, createSession } from '../../actions';
import NavBar from '../NavBar';


class MainScene extends Component {

  componentDidMount() {
    this.props.getEntries();
    AccessToken.getCurrentAccessToken().then(
      data => {
        if (data) {
          const accessToken = data.accessToken;
          const responseInfoCallback = (error, result) => {
            if (error) {
              alert(`Error fetching data: ${error.toSTring()}`);
            } else {
              this.props.createSession(result);
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

  assembleOptions = () => {

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          rightButton='newRequest'
          leftButton='sideMenu'
          title='Main'
        />
        <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Main Scene</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { requests, thankYous, loading } = state.entries;
  const {
    userData,
    activeDonation,
    anonEmail,
    recentSuccessfulRequest,
    recentThankYou,
  } = state.user;
  return {
    userData,
    activeDonation,
    anonEmail,
    recentSuccessfulRequest,
    recentThankYou,
    requests,
    thankYous,
    loading,
  };
};

export default connect(mapStateToProps, { getEntries, createSession })(MainScene);
