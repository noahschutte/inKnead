import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';
import { wholePizzaImage } from '../assets';
import DetailSection from './DetailSection';
import PizzaRadioButton from './PizzaRadioButton';

class EntryCreationForm extends Component {

  render() {
    const {
      updateSelectedPizzas,
      pizzas,
      updateSelectedVendor,
      vendor
    } = this.props;

    const selectedImage = (
      <Image source={wholePizzaImage} style={styles.selectedPizzaStyle} />
    );
    const unselectedImage = (
      <Image source={wholePizzaImage} style={styles.unselectedPizzaStyle} />
    );

    return (
      <View style={{ flex: 5 }}>
        <DetailSection bannerText='# OF PIZZAS' />
        <PizzaRadioButton
          selectedImage={selectedImage}
          unselectedImage={unselectedImage}
          options={[1, 2, 3]}
          selectedOption={pizzas}
          onPress={updateSelectedPizzas}
        />
        <DetailSection bannerText='VENDOR NEAR YOU' />
        <SegmentedControls
          tint={'#ce0000'}
          options={['Dominos', 'Papas Johns', 'Pizza Hut']}
          onSelection={updateSelectedVendor}
          selectedOption={vendor}
        />
      </View>
    );
  }
}

const styles = {
  selectedPizzaStyle: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  unselectedPizzaStyle: {
    width: 50,
    height: 50,
    marginRight: 10,
    opacity: 0.2,
  },
};

export default EntryCreationForm;
