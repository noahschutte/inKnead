import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import {
  createSession,
  getEntries,
  sortEntries,
  toggleScope,
} from '../../actions';
import ToggleMenu from '../ToggleMenu';
import SortBar from '../SortBar';
import Entries from '../Entries';


class MainScene extends Component {

  state = {
    sideMenuOpen: this.props.sideMenuOpen,
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
    const globalOptions = ['Requests', 'Thanks', 'Fulfilled', 'All'];
    const userHistoryOptions = ['Requested', 'Received', 'Donated', 'Gratitude'];
    if (this.props.entries.scope === 'requests_and_thank_yous') {
      return globalOptions;
    }
    return userHistoryOptions;
  }

  render() {
    const { userID, userData, entries } = this.props;
    const { shown, loading } = entries;
    const onChange = () => {
      this.setState({ sideMenuOpen: !this.props.sideMenuOpen });
    };
    const menu = (
      <ToggleMenu
        doesHaveNotifications={this.doesHaveNotifications()}
        userData={userData}
      />
    );
    const entryRows = this.getEntryRows();
    return (
      <SideMenu
        disableGestures
        onChange={onChange}
        menu={menu}
        isOpen={this.props.sideMenuOpen}
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
            getEntries={this.props.getEntries}
            loading={loading}
          />
        </View>
      </SideMenu>
    );
  }
}

const mapStateToProps = ({ entries, user }) => {
  const { userID, userData, notifications } = user;
  return { userID, userData, notifications, entries };
};

export default connect(mapStateToProps, {
  getEntries,
  sortEntries,
  createSession,
  toggleScope,
})(MainScene);
