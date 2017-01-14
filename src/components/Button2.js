import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
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

  determineStyles = () => {
    const { style } = this.props;
    if (style) {
      return style;
    }
    return {
      textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
      },
      buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#ce0000',
        marginLeft: 5,
        marginRight: 5,
      },
    };
  }

  assembleButton = (props) => {
    const {
      children,
      onPress,
    } = props;
    const { textStyle, buttonStyle } = this.determineStyles();

    let content;
    const { touchType, childType } = this.determineButtonType(props);

    if (childType === 'Raw Text') {
      content = (
        <Text style={[styles.textStyle, textStyle]}>{children}</Text>
      );
    } else {
      content = children;
    }

    switch (touchType) {
      case 'touchableOpacity':
        content = (
          <TouchableOpacity style={[styles.buttonStyle, buttonStyle]} onPress={onPress}>
            {content}
          </TouchableOpacity>
        );
        break;
      case 'touchableHighlight':
        content = (
          <TouchableHighlight style={[styles.buttonStyle, buttonStyle]} onPress={onPress}>
            {content}
          </TouchableHighlight>
        );
        break;
      default:
        content = (
          <TouchableWithoutFeedback style={[styles.buttonStyle, buttonStyle]} onPress={onPress}>
            {content}
          </TouchableWithoutFeedback>
        );
        break;
    }
    return content;
  }

  render() {
    const content = this.assembleButton(this.props);
    return content;
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ce0000',
    marginLeft: 5,
    marginRight: 5,
  },
};

export default Button;
