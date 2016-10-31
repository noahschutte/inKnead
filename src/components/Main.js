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
      scope: 'Global',
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.changeScope = this.changeScope.bind(this);
  }
  toggleMenu(isOpen) {
    this.setState({isOpen})
  }
  changeDisplay(display) {
    this.setState({display})
  }
  changeScope(scope) {
    this.setState({scope})
  }

  render() {
    const menu =
      <Menu toggleMenu={this.toggleMenu} currentDisplay={this.state.display} changeDisplay={this.changeDisplay} {...this.props} />

    let display;
    if (this.state.display === 'requests') {
      display = <Requests currentScope={this.state.scope} {...this.props} />
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
          <Nav toggleMenu={this.toggleMenu} isOpen={this.state.isOpen} currentDisplay={this.state.display} changeDisplay={this.changeDisplay} currentScope={this.state.scope} changeScope={this.changeScope} {...this.props} />

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
