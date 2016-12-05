import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';

const assets = {
  requests: require('../../assets/mobile-icons/Views.png'),
  history: require('../../assets/mobile-icons/Views-2.png')
};

export default class Activity extends Component {

  render() {
    const scope = [
      "Requests",
      "History",
    ]
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleActivity.bind(this)} style={styles.activityButton} activeOpacity={1}>
          <Image source={this.activityImage()} resizeMode='cover' style={styles.activityDisplay}/>
        </TouchableOpacity>
      </View>
    )
  }

  activityImage() {
    switch(this.props.currentScope) {
      case 'Requests':
        return assets.requests;
      case 'History':
        return assets.history;
    }
  }

  toggleActivity() {
    let scope = this.props.currentScope;
    console.log(scope);
    console.log(this.props);
    if (scope === 'Requests') {
      this.props.changeScope('History');
    } else {
      this.props.changeScope('Requests');
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityButton: {
  },
  activityDisplay: {
    flex: 1,
    height: 50,
    resizeMode: 'contain',
  }
})


// <SegmentedControls
//   containerBorderTint={'white'}
//   containerBorderWidth={1}
//   containerBorderRadius={5}
//   backTint={'#ce0000'}
//   tint={'white'}
//   options={ scope }
//   onSelection={ this.props.changeScope.bind(this) }
//   selectedOption={ this.props.currentScope }
//   />
