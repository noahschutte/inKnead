import React, { Component } from 'react';
import { View } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';
import DetailSection from './DetailSection';

class EntryCreationForm extends Component {

  render() {
    const {
      updateSelectedPizzas,
      pizzas,
      updateSelectedVendor,
      vendor
    } = this.props;
    return (
      <View style={{ flex: 5 }}>
        <DetailSection bannerText='# OF PIZZAS' />
        <SegmentedControls
          tint={'#ce0000'}
          options={[1, 2, 3]}
          onSelection={updateSelectedPizzas}
          selectedOption={pizzas}
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

export default EntryCreationForm;
