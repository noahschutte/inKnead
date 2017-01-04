import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

class NavBar extends Component {

  assembleContent = () => {
    const { onRightPress, onLeftPress, onTitlePress } = this.props;
    return (
      <View style={styles.navBarStyle}>
        <TouchableWithoutFeedback onPress={onLeftPress}>
          {this.renderLeftButton()}
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={onTitlePress}>
          {this.renderTitle()}
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={onRightPress}>
          {this.renderRightButton()}
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderTitle = () => {
    const title = this.props.title;
    const mainButton = require('../../assets/mobile-icons/Views.png');

    switch (title) {
      case 'Main':
        return (
          <Image
            style={styles.centerButtonStyle}
            source={mainButton}
          />
        );
      default:
        return (
          <Text style={styles.titleStyle}>{title}</Text>
        );
    }
  }

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
      <View style={{ flex: 1 }}>
        {this.assembleContent()}
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
    paddingBottom: 5,
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  titleStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 4,
  },
  centerButtonStyle: {
    flex: 4,
    resizeMode: 'contain',
    height: 50,
    width: null
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
