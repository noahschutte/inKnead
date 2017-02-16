import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { toggleScope } from '../actions';
import {
  globalButton,
  historyButton,
  backButton,
  menuButton,
  newRequestButton
} from '../assets';

class NavBar extends Component {

  renderTitle = () => {
    const { title } = this.props.navBarProps;
    const { scope, toggleScope } = this.props;
    let result;
    let onPress;

    switch (title) {

      case 'scope':
      onPress = toggleScope.bind(this, this.props.scope);
        switch (scope) {
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
          default:
            result = null;
            break;
        }
        break;
      case null:
        return null;
      default:
        return (
          <Text style={styles.titleStyle}>{title}</Text>
        );
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {result}
      </TouchableWithoutFeedback>
    );
  }

  renderLeftButton = () => {
    const { leftButton } = this.props.navBarProps;
    let result;
    let onPress;
    switch (leftButton) {
      case 'backButton':
        result = (
          <Image
            style={[styles.leftButtonStyle, { right: 15 }]}
            source={backButton}
          />
        );
        onPress = Actions.pop;
        break;
      case 'sideMenu':
      case 'menuButton':
        result = (
          <Image
            style={styles.leftButtonStyle}
            source={menuButton}
          />
        );
        onPress = () => Actions.refresh({ key: 'MainScene', sideMenuOpen: value => !value });
        break;
      default:
        return null;
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {result}
      </TouchableWithoutFeedback>
    );
  }

  renderRightButton = () => {
    const { rightButton } = this.props.navBarProps;
    let result;
    let onPress;
    switch (rightButton) {
      case 'newRequest':
        result = (
          <Image
            style={styles.rightButtonStyle}
            source={newRequestButton}
          />
        );
        onPress = Actions.EntryCreationScene;
        break;
      default:
        return null;
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {result}
      </TouchableWithoutFeedback>
    );
  }

  render() {
    // console.log(this);
    let content;
    if (this.props.navBarProps) {
      content = (
        <View style={styles.navBarStyle}>
          <StatusBar backgroundColor='#ce0000' />
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
  },
  rightButtonStyle: {
    flex: 1.5,
    resizeMode: 'contain',
    height: 30,
    width: null,
  },
  leftButtonStyle: {
    flex: 1.5,
    resizeMode: 'contain',
    height: 30,
    width: null,
  }
};

const mapStateToProps = ({ navBar, entries }) => {
  const { scope } = entries;
  return { navBar, scope };
};

export default connect(mapStateToProps, { toggleScope })(NavBar);
