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
      userThankYous
    } = this.props.entries;
    let userID;
    if (this.props.user.userData) {
      userID = this.props.user.userData.id;
    }

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
        return requests.filter(request => (request.donor_id === userID));
      case 'Gratitude':
        return userThankYous;
      default:
        return requests;
    }
  }

  doesHaveNotifications = () => {
    return this.props.user.notifications.length > 0;
  }

  assembleOptions = () => {
    const globalOptions = ['Requests', 'Thanks', 'Fulfilled', 'All'];
    const userHistoryOptions = ['Requested', 'Received', 'Donated', 'Gratitude'];
    if (this.props.entries.scope === 'requests_and_thank_yous') {
      return globalOptions;
    }
    return userHistoryOptions;
  }

  render() {
    const { shown, scope, loading, sideMenuOpen } = this.props.entries;
    const userData = this.props.user.userData;
    const togglePress = () => {
      this.props.sideMenuToggle(sideMenuOpen);
    };
    const menu = (
      <ToggleMenu
        doesHaveNotifications={this.doesHaveNotifications()}
        togglePress={togglePress}
        userData={userData}
      />
    );
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
            onTitlePress={() => this.props.toggleScope(scope, userData)}
          />
          <SortBar
            options={this.assembleOptions()}
            shown={shown}
            onPress={this.props.sortEntries}
          />
          <Entries
            userID={userData.id}
            origin='MainScene'
            entryRows={entryRows}
            getEntries={this.props.getEntries}
            loading={loading}
          />
        </View>
      </SideMenu>
    );
  }
}

const mapStateToProps = ({ entries, user }) => {
  return { user, entries };
};

export default connect(mapStateToProps, {
  getEntries,
  sortEntries,
  createSession,
  toggleScope,
  sideMenuToggle
})(MainScene);
