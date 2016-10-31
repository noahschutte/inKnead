import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {IndicatorViewPager, PagerTitleIndicator, PagerTabIndicator, PagerDotIndicator} from 'rn-viewpager';

export default class Swiper extends Component {
  _renderTitleIndicator() {
    return <PagerTitleIndicator titles={['Update Email', 'Donate', 'Request']} />;
  }
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }
  _renderTabIndicator() {
    let tabs = [{
      text: 'Update Email',
      iconSource: require('../../assets/left_caret.png'),
      selectedIconSource: require('../../assets/left_caret.png')
    },{
      text: 'Donate',
      iconSource: require('../../assets/left_caret.png'),
      selectedIconSource: require('../../assets/left_caret.png')
    },{
      text: 'Request',
      iconSource: require('../../assets/left_caret.png'),
      selectedIconSource: require('../../assets/left_caret.png')
    }];
    return <PagerTabIndicator tabs={tabs} />;
  }
  render() {
    return (
      <View style={styles.container}>
        <IndicatorViewPager
          style={{flex:1}}
          indicator={this._renderTabIndicator()}
          >
          <View style={{backgroundColor:'cadetblue'}}>
            <Text>Update Email</Text>
          </View>
          <View style={{backgroundColor:'cornflowerblue'}}>
            <Text>Donate</Text>
          </View>
          <View style={{backgroundColor:'#1AA094'}}>
            <Text>Request</Text>
          </View>
        </IndicatorViewPager>
      </View>
    )
  }
}

{/* <IndicatorViewPager
  style={{flex: 1}}
  indicator={this._renderDotIndicator()}
  >
  <View style={{backgroundColor:'cadetblue'}}>
    <Text>page one</Text>
  </View>
  <View style={{backgroundColor:'cornflowerblue'}}>
    <Text>page two</Text>
  </View>
  <View style={{backgroundColor:'#1AA094'}}>
    <Text>page three</Text>
  </View>
</IndicatorViewPager>

<IndicatorViewPager
  style={{flex:1}}
  indicator={this._renderTitleIndicator()}
  >
  <View style={{backgroundColor:'cadetblue'}}>
      <Text>page one</Text>
  </View>
  <View style={{backgroundColor:'cornflowerblue'}}>
      <Text>page two</Text>
  </View>
  <View style={{backgroundColor:'#1AA094'}}>
      <Text>page three</Text>
  </View>
</IndicatorViewPager> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'orange',
    // borderWidth: 3,
  },
})
