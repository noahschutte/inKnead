import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { wholePizzaImage } from '../assets';
import DetailSection from './DetailSection';
import PizzaRadioButton from './PizzaRadioButton';
import VendorRadioButton from './VendorRadioButton';

class EntryCreationForm extends Component {

  render() {
    const {
      updateSelectedPizzas,
      pizzas,
      updateSelectedVendor,
      vendor
    } = this.props;
    const { selectedImageStyle, unselectedImageStyle } = styles;

    const selectedPizzaImage = (
      <Image source={wholePizzaImage} style={selectedImageStyle} />
    );
    const unselectedPizzaImage = (
      <Image source={wholePizzaImage} style={unselectedImageStyle} />
    );

    return (
      <View style={{ flex: 5 }}>
        <DetailSection bannerText='# OF PIZZAS' />
        <PizzaRadioButton
          selectedImage={selectedPizzaImage}
          unselectedImage={unselectedPizzaImage}
          options={[1, 2, 3]}
          selectedOption={pizzas}
          onPress={updateSelectedPizzas}
        />
        <DetailSection bannerText='VENDOR NEAR YOU' />
        <VendorRadioButton
          vendors={['Dominos', 'Papa Johns', 'Pizza Hut']}
          onPress={updateSelectedVendor}
          selectedVendor={vendor}
        />
      </View>
    );
  }
}

const styles = {
  selectedImageStyle: {
    marginTop: 2,
    marginBottom: 2,
    width: 50,
    height: 50,
    marginRight: 10,
  },
  unselectedImageStyle: {
    marginTop: 2,
    marginBottom: 2,
    width: 50,
    height: 50,
    marginRight: 10,
    opacity: 0.2,
  },
};

export default EntryCreationForm;
