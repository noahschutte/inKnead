import React, { Component } from 'react';
import { Text, View, Image, Animated, Easing } from 'react-native';
import { loadingPizzaImage } from '../assets';

class LoadingPizza extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.spin();
  }
  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
      }
    ).start(this.spin);
  }
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={{ flex: 1 }} >
          <Animated.Image
            style={{ flex: 3, transform: [{ rotate: spin }], alignSelf: 'center', margin: 20, height: 75, resizeMode: 'contain' }}
            source={loadingPizzaImage}
          />
          <Text style={{ flex: 5, textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
            Loading...
          </Text>
      </View>
    );
  }
}

export default LoadingPizza;
