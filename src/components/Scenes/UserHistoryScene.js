import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getUserEntries } from '../../actions';
import NavBar from '../NavBar';
import Entries from '../Entries';

class UserHistoryScene extends Component {
  componentDidMount() {
    const { getUserEntries, userId } = this.props;
    getUserEntries(userId);
  }
  render() {
    const {
      userRequests,
      userFulfilled,
      userThankYous,
      getUserEntries,
      userId,
      loading
    } = this.props;
    const entryRows = [...userRequests, ...userFulfilled, ...userThankYous];
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          leftButton='backButton'
          onLeftPress={Actions.pop}
        />
        <View style={{ flex: 9 }}>
          <Entries
            origin='UserHistoryScene'
            entryRows={entryRows}
            getEntries={() => getUserEntries(userId)}
            loading={loading}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ entries }) => {
  const {
    userRequests,
    userFulfilled,
    userThankYous,
    loading
  } = entries;
  return {
    userRequests,
    userFulfilled,
    userThankYous,
    loading
  };
};

export default connect(mapStateToProps, { getUserEntries })(UserHistoryScene);
