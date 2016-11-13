import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ProfileButton from './ProfileButton';
import NewRequestButton from './NewRequestButton';
import BackButton from './BackButton';
import Activity from './Activity';
import MenuButton from './MenuButton';
import InfoButton from './InfoButton';

export default class Nav extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let leftButton;
    let center;
    let rightButton;

    if (this.props.backButton) {
      leftButton = <BackButton {...this.props} />
    } else if (this.props.navigator.state.routeStack[0].name === 'main') {
      leftButton = <MenuButton {...this.props} />
      rightButton = <NewRequestButton {...this.props} />
      center = <Activity currentScope={this.props.currentScope} changeScope={this.changeScope} {...this.props} />
    }

    // if (this.props.anonHistory) {
    //   console.log("this.props.anonHistory");
    //   center =
    //     <Text style={styles.anonHistory} >
    //       Anon History
    //     </Text>
    // }
    const statusBarHidden = false
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={statusBarHidden}
          />
        <View style={styles.leftBox}>
          {leftButton}
        </View>
        <View style={styles.centerBox}>
          {center}
        </View>
        <View style={styles.rightBox}>
          {rightButton}
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ce0000',
    flexDirection: 'row',
    paddingTop: 10,
    // marginTop: 16,
    // borderColor: 'blue',
    // borderWidth: 3,
  },
  leftBox: {
    flex: 1,
    // borderColor: 'yellow',
    // borderWidth: 3,
  },
  centerBox: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'purple',
    // borderWidth: 2,
  },
  rightBox: {
    flex: 1,
    // borderWidth: 3,
  },
  anonHistory: {
    fontWeight: 'bold',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
