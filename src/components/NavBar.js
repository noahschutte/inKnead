import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import {
  globalButton,
  historyButton,
  backButton,
  menuButton,
  newRequestButton
} from '../assets';

class NavBar extends Component {

  renderTitle = () => {
    const { title, onTitlePress } = this.props;
    let result;

    switch (title) {
      case 'requests_and_thank_yous':
        result = (
          <Image
            style={styles.centerButtonStyle}
            source={globalButton}
          />
        );
        break;
      case 'user_history':
        result = (
          <Image
            style={styles.centerButtonStyle}
            source={historyButton}
          />
        );
        break;
      case null:
        return null;
      default:
        return (
          <Text style={styles.titleStyle}>{title}</Text>
        );
    }
    return (
      <TouchableWithoutFeedback onPress={onTitlePress}>
        {result}
      </TouchableWithoutFeedback>
    );
  }

  renderLeftButton = () => {
    const { leftButton, onLeftPress } = this.props;
    let result;

    switch (leftButton) {
      case 'backButton':
        result = (
          <Image
            style={[styles.leftButtonStyle, { right: 15 }]}
            source={backButton}
          />
        );
        break;
      case 'sideMenu':
      case 'menuButton':
        result = (
          <Image
            style={styles.leftButtonStyle}
            source={menuButton}
          />
        );
        break;
      default:
        return null;
    }
    return (
      <TouchableWithoutFeedback onPress={onLeftPress}>
        {result}
      </TouchableWithoutFeedback>
    );
  }

  renderRightButton = () => {
    const { rightButton, onRightPress } = this.props;
    let result;

    switch (rightButton) {
      case 'newRequest':
        result = (
          <Image
            style={styles.rightButtonStyle}
            source={newRequestButton}
          />
        );
        break;
      default:
        return null;
    }
    return (
      <TouchableWithoutFeedback onPress={onRightPress}>
        {result}
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const content = (
      <View style={styles.navBarStyle}>
        {this.renderLeftButton()}
        {this.renderTitle()}
        {this.renderRightButton()}
      </View>
    );

    return (
      <View style={{ flex: 1 }}>
        {content}
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
    padding: 5,
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },  // Don't know how this looks, don't work on Android
    shadowOpacity: 0.1,  // Don't know how this looks, don't work on Android
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
    height: 35,
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
