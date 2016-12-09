/*
* @providesModule Profile2
*/

import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import GlobalStyles from 'InKneadStyle';
import Nav from './Nav';

export default class Profile2 extends Component {

  render() {
    return (
      <View style={GlobalStyles.container}>
        <Nav backButton {...this.props} />

        <View style={GlobalStyles.profileImageContainer}>
          <Image source={this.props.profileImage} style={GlobalStyles.profileImage} />
        </View>

        <View style={GlobalStyles.profileContent}>
          {this.profileContent()}
        </View>

      </View>
    )
  }

  profileContent() {
    if(this.props.verified) {
      return (
        <View style={{flex: 1}}>

          <View style={{alignSelf: 'center', flex: 1}}>
            <Text style={GlobalStyles.profileHeader}>EMAIL ADDRESS</Text>
          </View>

          <TouchableOpacity style={{flex: 2.3}} onPress={this.emailPress.bind(this)} activeOpacity={1}>
              <View style={styles.emailContainer}>
                <Text style={styles.emailText}>{this.props.verified}</Text>
                <Image source={require('../../assets/mobile-icons/angleBracketRight.png')} style={styles.editArrow} />
              </View>
          </TouchableOpacity>

          <View style={{alignSelf: 'center', flex: 1}}>
            <Text style={GlobalStyles.profileHeader}>LINKED ACCOUNTS</Text>
          </View>

          <View style={styles.socialContainer}>
            <Image source={require('../../assets/mobile-icons/facebook.png')} style={styles.socialIcon} />
            <Text style={styles.socialText}>Facebook</Text>
            <Image source={require('../../assets/mobile-icons/angleBracketRight.png')} style={styles.editArrow} />
          </View>

        </View>
      )
    }
    if(!this.props.verified) {
      return this.unverifiedEmail();
    }
  }

  emailPress() {
    console.log("works");
  }


  unverifiedEmail() {
    return(
      <View>
        <Text>Your facebook account was tied to: {this.props.user.signup_email}</Text>
        <Text>Is this the best email to reach you at? Or would you like to update? </Text>
      </View>
    )
  }
}





const styles = StyleSheet.create({
  emailContainer: {
    borderRadius: 3,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
  },
  emailText: {
    flex: 4,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 15,
  },
  socialText: {
    flex: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
  editArrow: {
    flex: 1,
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
  socialContainer: {
    alignItems: 'flex-start',
    borderRadius: 3,
    backgroundColor: 'white',
    flex: 6,
    flexDirection: 'row',
    margin: 5,
    padding: 10,
  },
  socialIcon: {
    flex: 1,
    resizeMode: 'contain',
    height: 25,
    width: 25,
  }
})
