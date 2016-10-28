import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Nav from './Nav';
import Requests from './Requests';
import Menu from './Menu';
import SideMenu from 'react-native-side-menu';

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.setState({isOpen: true})
  }

  render() {
    const menu =
      <Menu {...this.props} />

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        {...this.props} >
        <View style={styles.container}>
          <Nav isOpen={this.state.isOpen} toggleMenu={this.toggleMenu} {...this.props} />
          <Requests {...this.props} />
        </View>
      </SideMenu>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
