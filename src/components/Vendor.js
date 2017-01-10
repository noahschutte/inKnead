import React from 'react';
import { View, Image } from 'react-native';

const Vendor = ({ vendor, size }) => {
  const dominos = require('../../assets/mobile-icons/Dominos.png');
  const papas = require('../../assets/mobile-icons/Papa.png');
  const pizzaHut = require('../../assets/mobile-icons/pizzaHut.png');

  let vendorImageSource;
  switch (vendor) {
    case 'Dominos':
      vendorImageSource = dominos;
      break;
    case 'Papa Johns':
      vendorImageSource = papas;
      break;
    case 'Pizza Hut':
      vendorImageSource = pizzaHut;
      break;
    default:
      break;
  }

  let style;
  switch (size) {
    case 'large':
      style = styles.vendorImageLarge;
      break;
    default:
      style = styles.vendorImageSmall;
      break;
  }

  const vendorImage = (
    <Image source={vendorImageSource} style={style} />
  );

  return (
    <View style={styles.container}>
      {vendorImage}
    </View>
  );
};

const styles = {
  container: {
    margin: 2,
  },
  vendorImageSmall: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  vendorImageLarge: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  }
};

export default Vendor;
