import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Nav from './Nav';
import GlobalStyles from 'InKneadStyle';

export default class UserProfile extends Component {

  render() {
    console.log(this);

    return(
      <View style={styles.container}>
        <Nav backButton {...this.props} />
        <View style={styles.wrapper}>
          <Image source={require('../../assets/mobile-icons/profileIcon.png')} style={styles.profileImage} />
          <View style={styles.profileContent}>
            {this.profileContent()}
            <Text>Here is some text </Text>
          </View>
        </View>
      </View>
    )
  }

  profileContent() {
    return (
      <Text>Email Address</Text>
      <Text>{this.props.user.signup_email}</Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 9,
  },
  profileContent: {
    flex: 1,
    borderColor: 'yellow',
    borderWidth: 2,
  },
  profileImage: {
    flex: 1,
    width: 50,
    height: 50,
    margin: 10,
    resizeMode: 'stretch',
    alignSelf: 'center',
    borderColor: 'blue',
  },
})
