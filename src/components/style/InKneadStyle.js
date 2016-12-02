/*
* @providesModule InKneadStyle
*/

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PlatformStyleSheet from 'PlatformStyleSheet';

module.exports = PlatformStyleSheet.create({
    pizzas: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    pizzaImage: {
      height: 20,
      width: 20,
    },
  })
