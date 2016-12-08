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
    bold: {
      fontWeight: 'bold',
    },
    profileImageContainer: {
      flex: 3.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImage: {
      resizeMode: 'contain',
      width: 125,
    },
    profileContent: {
      flex: 5.5,
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
  })
