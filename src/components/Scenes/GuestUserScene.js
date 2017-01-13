import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { pizzaOnPlate } from '../../assets';
import Button from '../Button2';
import NavBar from '../NavBar';
import ReduxLogin from '../ReduxLogin';

class GuestUserScene extends Component {
  render() {
    const {
      container,
      top,
      bottom,
      image,
      title,
      text
    } = styles;
    return (
      <View style={container}>
        <NavBar
          leftButton='backButton'
          onLeftPress={() => Actions.pop()}
        />
        <View style={top}>
          <Image style={image} source={pizzaOnPlate} />
          <Text style={title}>
            in knead
          </Text>
          <Text style={text}>
            "The power of kindness, one pizza at a time"
          </Text>
        </View>
        <View style={bottom}>
          <Text style={text}>
            Please log in:
          </Text>
          <View>
            <ReduxLogin />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ce0000',
  },
  top: {
    flex: 7,
    alignItems: 'center',
  },
  bottom: {
    flex: 2,
    alignItems: 'center',
  },
  image: {
    height: 205,
    width: 200,
    borderRadius: 100 / 2,
  },
  title: {
    marginVertical: 20,
    fontSize: 55,
    color: 'white',
    fontFamily: 'Gillsans'
  },
  text: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    color: 'white',
    fontFamily: 'Gillsans',
  },
};

export default GuestUserScene;
