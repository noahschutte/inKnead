import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.props.onPress}
        >

        <Text style={styles.buttonText}>
          {this.props.text}
        </Text>

      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    backgroundColor: 'gray',
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
