/*
* @providesModule InKneadStyle
*/

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PlatformStyleSheet from 'PlatformStyleSheet';

module.exports = PlatformStyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#bbb',
    },
    hr: {
      backgroundColor: 'black',
      height: 1,
      borderWidth: 1,
    },
    bold: {
      fontWeight: 'bold',
    },
    profileImageContainer: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImage: {
      resizeMode: 'contain',
      width: 125,
    },
    profileContent: {
      flex: 6,
    },
    profileHeader: {
      fontWeight: 'bold',
      margin: 10,
    },
    pizzas: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    pizzaImage: {
      height: 20,
      width: 20,
    },
    nav: {
      flex: 1,
      backgroundColor: '#ce0000',
      flexDirection: 'row',
      paddingTop: 10,
    },
  });
