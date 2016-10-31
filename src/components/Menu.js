import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';

export default class Menu extends Component {
  onMainButtonPress() {
    if (this.props.currentDisplay !== 'requests') {
      this.props.changeDisplay('requests')
    }
    this.props.toggleMenu(false)
  }
  onHowToButtonPress() {
    if (this.props.currentDisplay !== 'howTo') {
      // this.props.changeDisplay('howTo')
      this.props.navigator.push({name: 'howTo'})
    }
    this.props.toggleMenu(false)
  }
  onProfileButtonPress() {
    if (this.props.currentDisplay !== 'profile') {
      // this.props.changeDisplay('profile')
      this.props.navigator.push({name: 'profile'})
    }
    this.props.toggleMenu(false)
  }
  onNewRequestButtonPress() {
    if (this.props.currentDisplay !== 'newRequest') {
      // this.props.changeDisplay('newRequest')
      this.props.navigator.push({name: 'newRequest'})
    }
    this.props.toggleMenu(false)
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.onMainButtonPress.bind(this)}
        style={styles.button}>
          <Text style={styles.instructions}>
            Main
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onHowToButtonPress.bind(this)} style={styles.button}>
          <Text style={styles.instructions}>
            How-To
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onProfileButtonPress.bind(this)} style={styles.button}>
          <Text style={styles.instructions}>
            Profile
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onNewRequestButtonPress.bind(this)} style={styles.button}>
          <Text style={styles.instructions}>
            Create Request
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'yellow',
    borderWidth: 3,
  },
  button: {
    alignSelf: 'stretch',
    borderColor: 'black',
    borderWidth: 2,
  },
  instructions: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  }
})
