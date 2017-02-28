import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getUserEntries } from '../../actions';
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
        <Entries
          origin='UserHistoryScene'
          entryRows={entryRows}
          getEntries={() => getUserEntries(userId)}
          loading={loading}
        />
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
