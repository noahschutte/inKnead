import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class LoadingPizza extends Component {

  render() {
    return (
      <View style={{ flex: 1 }} >
        <Image style={{ flex: 3, alignSelf: 'center', margin: 20, height: 75, resizeMode: 'contain' }} source={require('../../assets/mobile-icons/loadingPizza.png')} />
        <Text style={{ flex: 5, textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Loading...</Text>
      </View>
    );
  }

}
