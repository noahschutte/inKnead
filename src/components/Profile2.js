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
            <Text style={GlobalStyles.bold}>EMAIL ADDRESS</Text>
          </View>

          <View style={styles.emailContainer}>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} onPress={this.emailPress.bind(this)} activeOpacity={1}>
              <Text style={styles.emailText}>{this.props.verified}</Text>
              <Text style={styles.editArrow}>EAP</Text>
            </TouchableOpacity>
          </View>

          <View style={{alignSelf: 'center', flex: 1}}>
            <Text style={GlobalStyles.bold}>LINKED ACCOUNTS</Text>
          </View>

          <View style={styles.socialContainer}>
            <Text>Your facebook account!</Text>
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
    borderRadius: 2,
    backgroundColor: 'white',
    flex: 3,
    margin: 5,
  },
  emailText: {
    borderWidth: 2,
    borderColor: 'blue',
    flex: 3,
    justifyContent: 'center',
  },
  editArrow: {
    borderWidth: 2,
    borderColor: 'black',
    flex: 1,
    justifyContent: 'center',
    // resizeMode: 'contain',
    // height: 10,
  },
  socialContainer: {
    backgroundColor: 'white',
    flex: 6,
    margin: 5,
  }
})
