import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';

export default class Menu extends Component {
  onMainButtonPress() {
    console.log("hit main");
    console.log("navigator", this.props.navigator.state.routeStack[0].name);
    if (this.props.navigator.state.routeStack[0].name !== 'main') {
      this.props.navigator.immediatelyResetRouteStack(['main'])
      console.log("navigator", this.props.navigator.state.routeStack[0].name);
    }
    // console.log("toggleMenu", this.props.toggleMenu);
    // console.log("isOpen", this.props.isOpen);
    this.props.toggleMenu(false)
    // console.log("toggleMenu", this.props.toggleMenu);
    // console.log("isOpen", this.props.isOpen);
  }
  onHowToButtonPress() {
    console.log("hit howTo");
    console.log("navigator", this.props.navigator.state.routeStack[0].name);
    if (this.props.navigator.state.routeStack[0].name !== 'howTo') {
      this.props.navigator.immediatelyResetRouteStack(['howTo'])
      console.log("navigator", this.props.navigator.state.routeStack[0].name);
    }
    this.props.toggleMenu(false)
  }
  onProfileButtonPress() {
    console.log("hit profile");
    console.log("navigator", this.props.navigator.state.routeStack[0].name);
    if (this.props.navigator.state.routeStack[0].name !== 'profile') {
      this.props.navigator.push('profile');
      console.log("navigator", this.props.navigator.state.routeStack[0].name);
    }
    this.props.toggleMenu(false)
  }
  onNewRequestButtonPress() {
    console.log("hit newRequest");
    console.log("navigator", this.props.navigator.state.routeStack[0].name);
    if (this.props.navigator.state.routeStack[0].name !== 'newRequest') {
      this.props.navigator.immediatelyResetRouteStack(['newRequest'])
      console.log("navigator", this.props.navigator.state.routeStack[0].name);
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
