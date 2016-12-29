import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import HowTo from './components/HowTo';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="HowTo" component={HowTo} title="How-To" />
    </Router>
  );
};

export default RouterComponent;
