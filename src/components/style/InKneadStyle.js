/*
* @providesModule InKneadStyle
*/

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PlatformStyleSheet from 'PlatformStyleSheet';

module.exports = PlatformStyleSheet.create({
    container: {
      flex: 1,
      marginTop: 2,
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      borderBottomColor: '#BDBDBD',
      borderTopColor: '#BDBDBD',
      borderBottomWidth: 1,
      borderTopWidth: 1,
    },
    imageContainer: {
      flex: 1,
      margin: 2,
    },
    thumbnail: {
      resizeMode: 'contain',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    infoContainer: {
      flex: 1,
      margin: 5,
    },
    date: {
      alignItems: 'flex-end',
    },
    dateTime: {
      flex: 1,
      textAlign: 'center',
      fontSize: 10,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
      flexDirection: 'row',
    },
    pizzaImage: {
      height: 20,
      width: 20,
    },
    pizzas: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  })
