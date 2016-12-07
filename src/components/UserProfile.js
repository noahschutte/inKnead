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
    // justifyContent: 'space-around',
  },
  profileImage: {
    // flex: 1,
    // width: 50,
    height: 115,
    marginTop: 50,
    marginBottom: 35,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  profileContent: {
    flex: 1,
    borderColor: 'yellow',
    borderWidth: 2,
  }
})
