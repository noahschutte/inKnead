import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
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
      text: 'Step 1',
      iconSource: require('../../assets/left_caret.png'),
      selectedIconSource: require('../../assets/left_caret.png')
    },{
      text: 'Step 2',
      iconSource: require('../../assets/left_caret.png'),
      selectedIconSource: require('../../assets/left_caret.png')
    },{
      text: 'Step 3',
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
          <View style={styles.steps}>
            <Text style={styles.text}>How It Works{"\n"}(Step 1)</Text>
            <Image 
              style={styles.donate} 
              source={require('../../assets/donate.png')}
            />
            <Text style={styles.textBottom}>watch a video request,{"\n"}or make it your own</Text>
          </View>
          <View style={styles.steps}>
            <Text style={styles.text}>How It Works{"\n"}(Step 2)</Text>
            <Image style={styles.donate} source={require('../../assets/donate.png')}/>
            <Text style={styles.textBottom}>choose what you want{"\n"}to donate, and receive{"\n"}donations</Text>
          </View>
          <View style={styles.steps}>
            <Text style={styles.text}>How It Works{"\n"}(Step 3)</Text>
            <Image style={styles.donate} source={require('../../assets/donate.png')}/>
            <Text style={styles.textBottom}>send a THANK YOU to{"\n"}the awesome person who{"\n"}just gave you pizza!</Text>
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
  steps: {
    backgroundColor:'white',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 80,
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 30,
    fontFamily: 'GillSans',
    // need specific font, using this as template
    textAlign: 'center'
  },
  textBottom: {
    fontSize: 20,
    fontFamily: 'GillSans',
    textAlign: 'center'
  },
  donate: {
    width: 200,
    height: 100,
  }
})
