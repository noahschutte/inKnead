import React, { Component } from 'react';
import { Clipboard, Linking, TouchableOpacity, View, Text } from 'react-native';

const vendors = {
  'Pizza Hut': 'https://pizzahutstore.wgiftcard.com/chrome/pizzahut/',
  Dominos: 'https://dominosstore.wgiftcard.com/responsive/personalize_responsive/chooseDesign/dominos_responsive/1',
  'Papa Johns': 'https://papajohns-m.cashstar.com/buy/?ref=PJ1',
};

class InstructionsScene extends Component {

  handleVendorSite = vendorURL => {
    Linking.openURL(vendorURL);
  }

  _setClipboardContent = async () => {
    this.setState({ copied: true });
    Clipboard.setString(this.props.anonEmail);
    try {
      const content = await Clipboard.getString();
      this.setState({ content });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: 'center' }}>Instructions Scene</Text>
        <Text style={{ textAlign: 'center' }}>{this.props.recipientEmail}</Text>
      </View>
    );
  }
}

export default InstructionsScene;
