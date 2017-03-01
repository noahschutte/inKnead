import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import {
  createSession,
  getEntries,
  getUserEntries,
  sortEntries,
  toggleScope,
  toggleSideMenu,
  userLogout,
} from '../../actions';
import ToggleMenu from '../ToggleMenu';
import SortBar from '../SortBar';
import Entries from '../Entries';


class MainScene extends Component {

  getEntries = () => {
    if (this.props.userID) {
      this.props.getUserEntries(this.props.userID);
    } else {
      this.props.getEntries();
    }
  }

  onChange = (isOpen) => {
    if (isOpen === false) {
      this.props.toggleSideMenu(true);
    }
  }

  getEntryRows = () => {
    const {
      shown,
      requests,
      thankYous,
      userRequests,
      userFulfilled,
      userThankYous
    } = this.props.entries;
    const { userID } = this.props;

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
    return this.props.notifications.length > 0;
  }

  assembleOptions = () => {
    const globalOptions = ['Requests', 'Fulfilled', 'Thanks', 'All'];
    const userHistoryOptions = ['Requested', 'Received', 'Donated', 'Gratitude'];
    if (this.props.entries.scope === 'requests_and_thank_yous') {
      return globalOptions;
    }
    return userHistoryOptions;
  }


  render() {
    const { userID, userData, entries, sideMenuOpen } = this.props;
    const { shown, loading } = entries;
    const menu = (
      <ToggleMenu
        doesHaveNotifications={this.doesHaveNotifications()}
        userData={userData}
        toggle={this.props.toggleSideMenu}
        totalDonatedPizzas={entries.totalDonatedPizzas}
      />
    );
    const entryRows = this.getEntryRows();

    return (
      <SideMenu
        onChange={this.onChange}
        menu={menu}
        isOpen={sideMenuOpen}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <SortBar
            options={this.assembleOptions()}
            shown={shown}
            onPress={this.props.sortEntries}
          />
          <Entries
            userID={userID}
            origin='MainScene'
            entryRows={entryRows}
            getEntries={() => this.getEntries()}
            loading={loading}
          />
        </View>
      </SideMenu>
    );
  }
}

const mapStateToProps = ({ entries, user, nav }) => {
  const { userData, notifications, logOut } = user;
  let userID;
  if (userData) {
    userID = userData.id;
  }
  const { sideMenuOpen } = nav;
  return { userID, userData, notifications, logOut, entries, sideMenuOpen };
};

export default connect(mapStateToProps, {
  getEntries,
  getUserEntries,
  sortEntries,
  createSession,
  toggleScope,
  toggleSideMenu,
  userLogout
})(MainScene);
