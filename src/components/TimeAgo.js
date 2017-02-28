/*
* @providesModule TimeAgo
*/

import React, { Component } from 'react';
import { Text } from 'react-native';

export default class TimeAgo extends Component {

  formatDigits() {
    const age = this.props.secondsOld;
    if (age == 1 || age == 60 || age == 3600 || age == 86400 || age == 604800) {
      return 1;
    }
    if (age < 60) {
      return age;
    }
    if (age < 3600) {
      return Math.floor(age / 60);
    }
    if (age < 84600) {
      return Math.floor(age / 3600);
    }
    if (age < 604800) {
      return Math.floor(age / 86400);
    }
    return Math.floor(age / 604800);
  }

  formatTimeAgo() {
    const seconds = this.props.secondsOld;
    const time = this.formatDigits();
    let ago;

    if (seconds < 60) {
      ago = 'seconds';
    } else if (seconds < 3600) {
      ago = 'minutes';
    } else if (seconds < 86400) {
      ago = 'hours';
    } else if (seconds < 604800) {
      ago = 'days';
    } else {
      ago = 'weeks';
    }
    if (time == 1) {
      const timeAgo = `${time} ${ago}`;
      return timeAgo.substring(0, timeAgo.length - 1);
    }
    return `${time} ${ago}`;
  }

  render() {
    return <Text>{this.formatTimeAgo()} ago</Text>;
  }
}
