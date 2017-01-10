import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DetailSection from './DetailSection';
import Button from './Button2';

class EntryDetails extends Component {
  render() {
    return (
      <View style={{ flex: 5 }}>
        <DetailSection>
          VIDEO FOOTER
        </DetailSection>
        <DetailSection bannerText='REQUESTED'>
          Image placeholder
        </DetailSection>
        <DetailSection bannerText='VENDOR'>
          Image placeholder
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
