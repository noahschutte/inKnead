import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Nav from './Nav';
import Requests from './Requests';
import Profile from './Profile';
import NewRequest from './NewRequest';
import HowTo from './HowTo';
import Menu from './Menu';
import SideMenu from 'react-native-side-menu';
import History from './History';

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      scope: 'Global',
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changeScope = this.changeScope.bind(this);
  }
  toggleMenu(isOpen) {
    if (this.state.isOpen !== isOpen) {
      this.setState({isOpen})
    }
  }
  changeScope(scope) {
    if (this.state.scope !== scope) {
      this.setState({scope})
    }
  }

  render() {
    const menu =
      <Menu toggleMenu={this.toggleMenu} changeScope={this.changeScope} {...this.props} />

    let display;
    if (this.state.scope === 'Global') {
      display = <Requests currentScope={this.state.scope} {...this.props} />
    } else if (this.state.scope === 'Private') {
      display = <History currentScope={this.state.scope} {...this.props} />
    }
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        {...this.props} >
        <View style={styles.container}>
          <Nav toggleMenu={this.toggleMenu} isOpen={this.state.isOpen} currentScope={this.state.scope} changeScope={this.changeScope} {...this.props} />

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
