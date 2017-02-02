import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
  createSession,
  getEntries
} from '../../actions';
import SpinningPizza from '../SpinningPizza';

class InitialScene extends Component {

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

  render() {
    return (
      <View style={styles.containerStyle}>
        <SpinningPizza />
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>
            in knead
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ entries, user }) => {
  const {
    userData,
    activeDonation,
    anonEmail,
    recentSuccessfulRequest,
    recentThankYou,
  } = user;
  const {
    requests,
    thankYous,
    userRequests,
    userThankYous,
    userFulfilled,
    shown,
    scope,
  } = entries;
  return {
    userData,
    activeDonation,
    anonEmail,
    recentSuccessfulRequest,
    recentThankYou,
    requests,
    thankYous,
    userThankYous,
    userRequests,
    userFulfilled,
    shown,
    scope,
  };
};

const styles = {
  containerStyle: {
    paddingTop: 25,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ce0000'
  },
  textContainer: {
    flex: 0.75,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 50,
    paddingTop: 25,
    color: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
};

export default connect(mapStateToProps, {
  createSession,
  getEntries,
})(InitialScene);
