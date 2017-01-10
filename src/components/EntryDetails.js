import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DetailSection from './DetailSection';
import Button from './Button2';
import RequestPizzas from './RequestPizzas';
import Vendor from './Vendor';

class EntryDetails extends Component {
  render() {
    return (
      <View style={{ flex: 5 }}>
        <DetailSection>
          VIDEO FOOTER
        </DetailSection>

        <DetailSection bannerText='REQUESTED'>
          <RequestPizzas size='large' pizzas={this.props.entryData.pizzas} />
          <Text style={styles.requestTextStyle}>from</Text>
          <Vendor size='large' vendor={this.props.entryData.vendor} />
        </DetailSection>

        <View style={styles.buttonWrapper}>
          <Button touchableOpacity>
            <Text style={styles.donateTextStyle}>DONATE!</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  requestTextStyle: {
    fontWeight: 'bold',
    padding: 10,
    alignSelf: 'center',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  donateTextStyle: {
    alignSelf: 'center',
    color: '#ce0000',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
    textShadowColor: '#ccc',
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 2,
  }
};

export default EntryDetails;
