import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getUserEntries } from '../../actions';
import NavBar from '../NavBar';
import Entries from '../Entries';

class UserHistoryScene extends Component {
  componentDidMount() {
    this.props.getUserEntries(userId);
  }
  render() {
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

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { getUserEntries })(UserHistoryScene);
