import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ProfileButton from './ProfileButton';
import CreateRequestButton from './CreateRequestButton';
import BackButton from './BackButton';

export default class Nav extends Component {
  render() {
    let leftButton;
    let createRequestButton;

    if (this.props.backButton) {
      leftButton = <BackButton {...this.props} />
    } else if (this.props.route.name === "main") {
      leftButton = <ProfileButton {...this.props} />
      createRequestButton = <CreateRequestButton {...this.props} />
    }

    return (
      <View style={styles.container}>

        {leftButton}

        <View style={styles.logo}>
          <Text style={styles.text}>
            in knead
          </Text>
        </View>

        {createRequestButton}

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
    // borderWidth: 3,
  },
  logo: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'green',
    // borderWidth: 2,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
