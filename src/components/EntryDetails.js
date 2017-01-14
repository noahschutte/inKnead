import React from 'react';
import { View, Text } from 'react-native';
import DetailSection from './DetailSection';
import Button from './Button2';
import TimeAgo from './TimeAgo';
import RequestPizzas from './RequestPizzas';
import Vendor from './Vendor';

const EntryDetails = ({ entryData }) => {
  const { pizzas, vendor, seconds } = entryData;
    return (
      <View style={{ flex: 5 }}>
        <DetailSection style={{ justifyContent: 'space-between' }}>
          <TimeAgo secondsOld={seconds} />
          <Button
             touchableOpacity
             style={{ buttonStyle: styles.userHistoryButton }}
          >
            <Text
              style={styles.userHistoryText}
            >User History</Text>
          </Button>
        </DetailSection>

        <DetailSection bannerText='REQUESTED'>
          <RequestPizzas size='large' pizzas={pizzas} />
          <Text style={styles.requestTextStyle}>from</Text>
          <Vendor size='large' vendor={vendor} />
        </DetailSection>

        <View style={styles.buttonWrapper}>
          <Button touchableOpacity>
            <Text style={styles.donateTextStyle}>DONATE!</Text>
          </Button>
        </View>
      </View>
    );
};

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
  userHistoryText: {
    color: 'black',
    textDecorationLine: 'underline',
    padding: 0,
    margin: 0,
  },
  userHistoryButton: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
    borderColor: 'black',
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
