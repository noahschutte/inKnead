import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';

export default class Activity extends Component {
  render() {
    const scope = [
      "Requests",
      "History",
    ]
    return (
      <View style={styles.container}>
        <SegmentedControls
          containerBorderTint={'white'}
          containerBorderWidth={1}
          containerBorderRadius={5}
          backTint={'#ce0000'}
          tint={'white'}
          options={ scope }
          onSelection={ this.props.changeScope.bind(this) }
          selectedOption={ this.props.currentScope }
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
