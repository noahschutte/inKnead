import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
  createSession,
  getEntries,
  sortEntries,
  toggleScope
} from '../../actions';
import NavBar from '../NavBar';
import SortBar from '../SortBar';
import Entries from '../Entries';
import LoadingPizza from '../LoadingPizza';


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
    const globalOptions = ['Requests', 'Thanks', 'Fulfilled', 'All'];
    const userHistoryOptions = ['Kneaded', 'Doughnated'];
    if (this.props.scope === 'requests_and_thank_yous') {
      return globalOptions;
    }
    return userHistoryOptions;
  }

  render() {
    const {
      loading,
      shown,
      toggleScope,
      scope,
      sortEntries,
      requests,
      thankYous,
    } = this.props;

    const titlePress = () => {
      toggleScope(scope);
    };

    const entryRows = () => {
      switch (shown) {
        case 'All':
          return [...requests, ...thankYous];
        case 'Requests':
          return requests.filter(request => request.donor_id === null);
        case 'Thanks':
          return thankYous;
        case 'Fulfilled':
          return requests.filter(request => request.donor_id !== null);
        default:
          return requests;
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <NavBar
          rightButton='newRequest'
          leftButton='sideMenu'
          title='Main'
          onRightPress={() => console.log('pressed!')}
          onLeftPress={() => console.log('pressed!')}
          onTitlePress={titlePress}
        />
        <SortBar
          options={this.assembleOptions()}
          shown={shown}
          onPress={sortEntries}
        />
        <Entries
          shown={shown}
          entryRows={entryRows()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    requests,
    thankYous,
    shown,
    loading,
    scope
  } = state.entries;
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
    shown,
    loading,
    scope
  };
};

export default connect(mapStateToProps, { getEntries, sortEntries, createSession, toggleScope })(MainScene);
