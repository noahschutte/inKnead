import React, { Component } from 'react';
import { Text, View, Image, Animated, Easing } from 'react-native';
import { loadingPizzaImage } from '../assets';

class LoadingPizza extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.state = {
      loading: true,
      text: 'Loading'
    };
  }
  componentDidMount() {
    this.bundleCallbacks();
  }
  bundleCallbacks = () => {
    this.spin();
    this.loadingText();
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
    ).start(this.bundleCallbacks);
  }
  loadingText = () => {
    console.log(this.props);
    setTimeout(() => {
      let dots = '';
      for (let i = 0; i < 3; i++) {
        dots += '.';
        this.setState({ text: `Loading${dots}` });
      }
    }, 500);
    this.loadingText();
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
            {this.state.text}
          </Text>
      </View>
    );
  }
}

export default LoadingPizza;
