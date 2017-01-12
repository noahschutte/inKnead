import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import {
  dominosVendorImage,
  papasVendorImage,
  pizzaHutVendorImage
} from '../assets';

class VendorRadioButton extends Component {
  assembleImages = () => {
    const dominos = (
      <Image
      name='Dominos'
      source={dominosVendorImage}
      style={styles.unselectedImageStyle}
      />
    );
    const papas = (
      <Image
        name='Papa Johns'
        source={papasVendorImage}
        style={styles.unselectedImageStyle}
      />
    );
    const pizzaHut = (
      <Image
        name='Pizza Hut'
        source={pizzaHutVendorImage}
        style={styles.unselectedImageStyle}
      />
    );

    switch (this.props.selectedVendor) {
      case 'Dominos':
        dominos.style = styles.selectedImageStyle;
        break;
      case 'Papa Johns':
        papas.style = styles.selectedImageStyle;
        break;
      case 'Pizza Hut':
        pizzaHut.style = styles.selectedImageStyle;
        break;
      default:
        break;
    }
    return [dominos, papas, pizzaHut];
  }

  renderContent = () => {
    const onPress = this.props.onPress;
    const images = this.assembleImages();
    return (
      <View style={styles.container}>
        {images.map((image, index) => {
          return (
            <TouchableWithoutFeedback onPress={() => onPress(image.name)} key={index}>
              {image}
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  }

  render() {
    const content = this.renderContent();
    return content;
  }
}

const styles = {
  container: {
    alignSelf: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  selectedImageStyle: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  unselectedImageStyle: {
    width: 50,
    height: 50,
    marginRight: 10,
    opacity: 0.2,
  },
};

export default VendorRadioButton;
