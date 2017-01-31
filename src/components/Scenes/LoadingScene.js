import React, { Component } from 'react';
import { View } from 'react-native';
import SpinningPizza from '../SpinningPizza';

class LoadingScene extends Component {
  render() {
    return (
      <SpinningPizza />
    );
  }
}

export default LoadingScene;
