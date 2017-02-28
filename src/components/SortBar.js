import React, { Component } from 'react';
import { View } from 'react-native';
import SortButton from './SortButton';

class SortBar extends Component {

  mapOptionsToButtons = () => {
    const { shown, options, onPress } = this.props

    return options.map(option => {
      return (
        <SortButton
          key={option}
          onPress={onPress}
          shown={option === shown}
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

export default SortBar;
