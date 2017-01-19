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
    console.log(this.props);
  }
  render() {
    const { userRequests, userFulfilled, userThankYous } = this.props;
    const entryRows = [...userRequests, ...userFulfilled, ...userThankYous];
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          leftButton='backButton'
          onLeftPress={Actions.pop}
        />
        <View style={{ flex: 9 }}>
          <Entries
            entryRows={entryRows}
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
    userThankYous
  } = entries;
  return {
    userRequests,
    userFulfilled,
    userThankYous
  };
};

export default connect(mapStateToProps, { getUserEntries })(UserHistoryScene);
