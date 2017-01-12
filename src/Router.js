import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import MainScene from './components/Scenes/MainScene';
import EntryCreationScene from './components/Scenes/EntryCreationScene';
import EntryScene from './components/Scenes/EntryScene';
import HowToScene from './components/Scenes/HowToScene';
import NotificationsScene from './components/Scenes/NotificationsScene';
import ProfileScene from './components/Scenes/ProfileScene';
import UserHistoryScene from './components/Scenes/UserHistoryScene';
import GuestUserScene from './components/Scenes/GuestUserScene';

const RouterComponent = () => {
  return (
    <Router hideNavBar >
      <Scene
        initial
        key="MainScene"
        component={MainScene}
      />
      <Scene
        key="EntryCreationScene"
        component={EntryCreationScene}
      />
      <Scene
        key="EntryScene"
        component={EntryScene}
      />
      <Scene
        key="HowToScene"
        component={HowToScene}
      />
      <Scene
        key="NotificationsScene"
        component={NotificationsScene}
      />
      <Scene
        key="ProfileScene"
        component={ProfileScene}
      />
      <Scene
        key="UserHistoryScene"
        component={UserHistoryScene}
      />
      <Scene
        key="GuestUserScene"
        component={GuestUserScene} 
      />
    </Router>
  );
};

export default RouterComponent;
