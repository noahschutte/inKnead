import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Text
} from 'react-native';

class Button extends Component {

  determineButtonType = (props) => {
    /* Returns an object describing the type of children
    and type of touchable primitive passed to the button component,
    defaulting to TouchableWithoutFeedback if no touch type is passed
    */
    const { type } = props.children;
    const result = {
      touchType: null,
      childType: null,
    };

    if (type !== undefined) {
      result.childType = type.displayName;
    } else {
      result.childType = 'Raw Text';
    }

    const {
      touchableOpacity,
      touchableHighlight
    } = props;

    if (touchableOpacity) {
      result.touchType = 'touchableOpacity';
    } else if (touchableHighlight) {
      result.touchType = 'touchableHighlight';
    } else {
      result.touchType = 'touchableWithoutFeedback';
    }
    return result;
  }

  determineStyles = (childType, { textStyle, buttonStyle }) => {
    const styles = { textStyle, buttonStyle };
    if (textStyle === undefined) {
      // Assign textStyle
      styles.textStyle = {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
      };
    }
    if (buttonStyle === undefined) {
      if (childType !== 'Image') {
        styles.buttonStyle = {
          alignSelf: 'stretch',
          backgroundColor: '#fff',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#007aff',
          marginLeft: 5,
          marginRight: 5
        };
      }
    }
    return styles;
  }

  assembleButton = (props) => {
    const {
      children,
      onPress,
      textStyle,
      buttonStyle
    } = props;

    let content;
    const { touchType, childType } = this.determineButtonType(props);
    const styles = this.determineStyles(childType, { textStyle, buttonStyle });

    if (childType === 'Raw Text') {
      content = (
        <Text style={styles.textStyle}>{children}</Text>
      );
    } else {
      content = children;
    }

    switch (touchType) {
      case 'touchableOpacity':
        content = (
          <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
            {content}
          </TouchableOpacity>
        );
        break;
      case 'touchableHighlight':
        content = (
          <TouchableHighlight style={styles.buttonStyle} onPress={onPress}>
            {content}
          </TouchableHighlight>
        );
        break;
      default:
        content = (
          <TouchableWithoutFeedback style={styles.buttonStyle} onPress={onPress}>
            {content}
          </TouchableWithoutFeedback>
        );
        break;
    }
    return content;
  }

  render() {
    const content = this.assembleButton(this.props);
    console.log('button this', this);
    return content;
  }
}

export default Button;
