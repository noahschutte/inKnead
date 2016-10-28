import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ProfileButton from './ProfileButton';
import NewRequestButton from './NewRequestButton';
import BackButton from './BackButton';
import Activity from './Activity';
import MenuButton from './MenuButton';
import InfoButton from './InfoButton';

export default class Nav extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let leftButton;
    let activity;
    let rightButton;

    activity = <Activity {...this.props} />

    if (this.props.backButton) {
      leftButton = <BackButton {...this.props} />
    } else if (this.props.route.name === "main") {
      leftButton = <MenuButton {...this.props} />
      rightButton = <InfoButton {...this.props} />
    }

    return (
      <View style={styles.container}>
        <View style={styles.leftBox}>
          {leftButton}
        </View>
        <View style={styles.centerBox}>
          {activity}
        </View>
        <View style={styles.rightBox}>
          {rightButton}
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ce0000',
    flexDirection: 'row',
    borderColor: 'blue',
    borderWidth: 3,
  },
  leftBox: {
    flex: 1,
    borderColor: 'yellow',
    borderWidth: 3,
  },
  centerBox: {
    flex: 3,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderColor: 'purple',
    borderWidth: 2,
  },
  rightBox: {
    flex: 1,
    borderWidth: 3,
  },
});
