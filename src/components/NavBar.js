import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions
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
    const { title, onTitlePress } = this.props.navBarProps;
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
    const { leftButton, onLeftPress } = this.props.navBarProps;
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
    const { rightButton, onRightPress } = this.props.navBarProps;
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
    console.log(this);
    let content;
    if (this.props.navBarProps) {
      content = (
        <View style={styles.navBarStyle}>
          {this.renderLeftButton()}
          {this.renderTitle()}
          {this.renderRightButton()}
        </View>
      );
    } else {
      content = <View style={styles.navBarStyle}><Text>No Nav Props</Text></View>;
    }

    return content;
  }
}

const styles = {
  navBarStyle: {
    position: 'absolute',
    height: 54,
    width: Dimensions.get('window').width,
    top: 0,
    flexDirection: 'row',
    backgroundColor: '#ce0000',
    alignItems: 'center',
    padding: 5,
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
    height: 40,
    width: null
  },
  rightButtonStyle: {
    flex: 1,
    resizeMode: 'contain',
    height: 30,
    width: null,
  },
  leftButtonStyle: {
    flex: 1,
    resizeMode: 'contain',
    height: 30,
    width: null,
  }
};

export default NavBar;
