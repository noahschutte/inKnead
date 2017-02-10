import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import {
  createSession,
  getEntries,
  sortEntries,
  toggleScope,
  sideMenuToggle
} from '../../actions';
import ToggleMenu from '../ToggleMenu';
import NavBar from '../NavBar';
import SortBar from '../SortBar';
import Entries from '../Entries';


class MainScene extends Component {

  getEntryRows = () => {
    const {
      shown,
      requests,
      thankYous,
      userRequests,
      userFulfilled,
      userData,
      userThankYous
    } = this.props;

    switch (shown) {
      case 'All':
        return [...requests, ...thankYous];
      case 'Requests':
        if (requests) {
          return requests.filter(request => request.donor_id === null);
        }
        return [];
      case 'Thanks':
        return thankYous;
      case 'Fulfilled':
        return requests.filter(request => request.donor_id !== null);
      case 'Requested':
        return userRequests;
      case 'Received':
        return userFulfilled;
      case 'Donated':
        return requests.filter(request => (request.donor_id === userData.id));
      case 'Gratitude':
        return userThankYous;
      default:
        return requests;
    }
  }

  assembleOptions = () => {
    const globalOptions = ['Requests', 'Thanks', 'Fulfilled', 'All'];
    const userHistoryOptions = ['Requested', 'Received', 'Donated', 'Gratitude'];
    if (this.props.scope === 'requests_and_thank_yous') {
      return globalOptions;
    }
    return userHistoryOptions;
  }

  render() {
    const {
      shown,
      toggleScope,
      scope,
      loading,
      getEntries,
      sortEntries,
      sideMenuOpen,
      sideMenuToggle,
      userData
    } = this.props;

    const togglePress = () => {
      sideMenuToggle(sideMenuOpen);
    };
    const menu = <ToggleMenu togglePress={togglePress} userData={userData} />;
    const entryRows = this.getEntryRows();

    return (
      <SideMenu
        disableGestures
        menu={menu}
        isOpen={sideMenuOpen}
        onChange={togglePress}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <NavBar
            rightButton='newRequest'
            leftButton='sideMenu'
            title={scope}
            onRightPress={Actions.EntryCreationScene}
            onLeftPress={togglePress}
            onTitlePress={() => toggleScope(scope, userData)}
          />
          <SortBar
            options={this.assembleOptions()}
            shown={shown}
            onPress={sortEntries}
          />
          <Entries
            entryRows={entryRows}
            getEntries={getEntries}
            loading={loading}
          />
        </View>
      </SideMenu>
    );
  }
}

const mapStateToProps = ({ entries, user }) => {
  const {
    requests,
    thankYous,
    userRequests,
    userThankYous,
    userFulfilled,
    shown,
    loading,
    scope,
    sideMenuOpen
  } = entries;
  const {
    userData,
    activeDonation,
    recipientEmail,
    recentSuccessfulRequest,
    recentThankYou,
  } = user;

  return {
    userData,
    activeDonation,
    recipientEmail,
    recentSuccessfulRequest,
    recentThankYou,
    requests,
    thankYous,
    userRequests,
    userThankYous,
    userFulfilled,
    shown,
    loading,
    scope,
    sideMenuOpen
  };
};

export default connect(mapStateToProps, {
  getEntries,
  sortEntries,
  createSession,
  toggleScope,
  sideMenuToggle
})(MainScene);
