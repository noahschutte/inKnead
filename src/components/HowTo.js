import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ViewPager from './ViewPager';
import Swiper from './Swiper';

export default class HowTo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper {...this.props} />
      </View>
    )
  }
}
{/* <ViewPager viewpagerStyle={styles.viewpager} {...this.props} /> */}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    // borderColor: 'red',
    // borderWidth: 3,
  },
  viewpager:{
    flex: 1,
    borderColor: 'red',
    borderWidth: 3,
  },
})
