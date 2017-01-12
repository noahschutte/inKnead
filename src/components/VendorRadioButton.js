import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import {
  dominosVendorImage,
  papasVendorImage,
  pizzaHutVendorImage
} from '../assets';

class VendorRadioButton extends Component {
  getStyle = (vendorName) => {
    if (vendorName === this.props.selectedVendor) {
      return {
        margin: 2,
        width: 50,
        height: 50,
        marginRight: 10,
        resizeMode: 'contain',
      };
    }
    return {
      margin: 2,
      width: 50,
      height: 50,
      marginRight: 10,
      resizeMode: 'contain',
      opacity: 0.2,
    };
  }
  
  assembleImages = () => {
    const dominos = (
      <Image
      name='Dominos'
      source={dominosVendorImage}
      style={this.getStyle('Dominos')}
      />
    );
    const papas = (
      <Image
        name='Papa Johns'
        source={papasVendorImage}
        style={this.getStyle('Papa Johns')}
      />
    );
    const pizzaHut = (
      <Image
        name='Pizza Hut'
        source={pizzaHutVendorImage}
        style={this.getStyle('Pizza Hut')}
      />
    );
    return [dominos, papas, pizzaHut];
  }


  renderContent = () => {
    const { onPress } = this.props;
    const images = this.assembleImages();
    return (
      <View style={styles.container}>
        {images.map((image, index) => {
          return (
            <TouchableWithoutFeedback onPress={() => onPress(image.props.name)} key={index}>
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
};

export default VendorRadioButton;
