import React, { Component } from 'react';
import { Text, View, Image, Animated, Easing } from 'react-native';
import { loadingPizzaImage } from '../assets';

class LoadingPizza extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.state = {
      text: 'Loading'
    };
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Animated.Image
            style={{
              flex: 4,
              transform: [{ rotate: spin }],
              alignSelf: 'center',
              margin: 20,
              height: 100,
              resizeMode: 'contain'
            }}
            source={loadingPizzaImage}
          />
          <Text style={styles.textStyle}>
            {this.state.text}
          </Text>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    flex: 3,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
    color: '#ce0000',
  },
};

export default LoadingPizza;
