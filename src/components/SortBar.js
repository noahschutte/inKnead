import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { sortEntries } from '../actions';
import SortButton from './SortButton';

class SortBar extends Component {

  mapOptionsToButtons = () => {
    return this.props.options.map(option => {
      return (
        <SortButton
          key={option}
          onPress={this.props.sortEntries}
          shown={option === this.props.shown}
        >
          {option}
        </SortButton>
      );
    });
  }

  render() {
    return (
      <View style={styles.sortBarStyle}>
        {this.mapOptionsToButtons()}
      </View>
    );
  }
}

const styles = {
  sortBarStyle: {
    flex: 0.5,
    flexDirection: 'row',
  }
};

export default connect(null, { sortEntries })(SortBar);
