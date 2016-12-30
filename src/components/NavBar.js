import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class NavBar extends Component {

  renderLeftButton = () => {
    const leftButton = this.props.leftButton;
    const backButton = require('../../assets/mobile-icons/disclosure-indicator.png');
    const menuButton = require('../../assets/menuButton.png');

    switch (leftButton) {
      case 'backButton':
        return (
          <Image
            style={styles.leftButtonStyle}
            source={backButton}
          />
        );
      case 'sideMenu':
      case 'menuButton':
        return (
          <Image
            style={styles.leftButtonStyle}
            source={menuButton}
          />
        );
      default:
        return null;
    }
  }

  renderRightButton = () => {
    const rightButton = this.props.rightButton;
    const newRequestButton = require('../../assets/add.png');

    switch (rightButton) {
      case 'newRequest':
        return (
          <Image
            style={styles.rightButtonStyle}
            source={newRequestButton}
          />
        );
      default:
        return null;
    }
  }


  render() {
    return (
      <View style={styles.navBarStyle}>
        {/* <Text style={{ flex: 1 }}>Left Button</Text> */}
        {this.renderLeftButton()}
        <Text style={styles.titleStyle}>Nav Bar</Text>
        {this.renderRightButton()}
      </View>
    );
  }
}

const styles = {
  navBarStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ce0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 4,
  },
  rightButtonStyle: {
    flex: 1,
    resizeMode: 'contain',
    height: 42,
    width: null,
  },
  leftButtonStyle: {
    flex: 1,
    resizeMode: 'contain',
    height: 35,
    width: null,
  }
};

export default NavBar;
