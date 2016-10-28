import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Nav from './Nav';
import Requests from './Requests';
import Profile from './Profile';
import NewRequest from './NewRequest';
import HowTo from './HowTo';
import Menu from './Menu';
import SideMenu from 'react-native-side-menu';

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      display: 'requests',
      isOpen: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }
  toggleMenu(isOpen) {
    this.setState({isOpen})
  }
  changeDisplay(display) {
    this.setState({display})
  }

  render() {
    const menu =
      <Menu toggleMenu={this.toggleMenu} currentDisplay={this.currentDisplay} changeDisplay={this.changeDisplay} {...this.props} />

    let display;
    if (this.state.display === 'requests') {
      display = <Requests changeDisplay={this.changeDisplay} {...this.props} />
    } else if (this.state.display === 'profile') {
      display = <Profile {...this.props} />
    } else if (this.state.display === 'howTo') {
      display = <HowTo {...this.props} />
    } else if (this.state.display === 'newRequest') {
      display = <NewRequest {...this.props} />
    }
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        {...this.props} >
        <View style={styles.container}>
          <Nav toggleMenu={this.toggleMenu} isOpen={this.state.isOpen} {...this.props} />

          {display}
        </View>
      </SideMenu>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
