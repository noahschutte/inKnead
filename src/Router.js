import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import HowTo from './components/HowTo';
import MainScene from './components/Scenes/MainScene';

const RouterComponent = () => {
  return (
    <Router
      hideNavBar
    >
      <Scene
        key="MainScene"
        component={MainScene}
      />
    </Router>
  );
};

export default RouterComponent;
