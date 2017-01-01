import React from 'react';
import { Text, View, Image } from 'react-native';

const LoadingPizza = () => {
    return (
      <View style={{ flex: 1 }} >
        <Image
          style={{ flex: 3, alignSelf: 'center', margin: 20, height: 75, resizeMode: 'contain' }}
          source={require('../../assets/mobile-icons/loadingPizza.png')}
        />
        <Text style={{ flex: 5, textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
          Loading...
        </Text>
      </View>
    );
  };

export default LoadingPizza;
