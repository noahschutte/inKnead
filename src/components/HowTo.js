import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ViewPager from './ViewPager';
import Swiper from './Swiper';
import Nav from './Nav';

export default class HowTo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Nav backButton {...this.props} />
        <View style={styles.wrapper}>
          <Swiper {...this.props} />
        </View>
      </View>
    )
  }
}
{/* <ViewPager viewpagerStyle={styles.viewpager} {...this.props} /> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 3,
  },
  wrapper: {
    flex: 9,
  },
  viewpager: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 3,
  },
})
