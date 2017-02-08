import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import InitialScene from './components/Scenes/InitialScene';
import CameraScene from './components/Scenes/CameraScene';
import MainScene from './components/Scenes/MainScene';
import EntryCreationScene from './components/Scenes/EntryCreationScene';
import EntryScene from './components/Scenes/EntryScene';
import HowToScene from './components/Scenes/HowToScene';
import NotificationsScene from './components/Scenes/NotificationsScene';
import ProfileScene from './components/Scenes/ProfileScene';
import UserHistoryScene from './components/Scenes/UserHistoryScene';
import LoginScene from './components/Scenes/LoginScene';
import LoadingScene from './components/Scenes/LoadingScene';
import UploadingScene from './components/Scenes/UploadingScene';

const RouterComponent = () => {
  return (
    <Router hideNavBar >
      <Scene
        initial
        key="InitialScene"
        component={InitialScene}
      />
      <Scene
        key="LoadingScene"
        component={LoadingScene}
      />
      <Scene
        key="UploadingScene"
        component={UploadingScene}
      />
      <Scene
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
        key="LoginScene"
        component={LoginScene}
      />
      <Scene
        key="CameraScene"
        component={CameraScene}
      />
    </Router>
  );
};

export default RouterComponent;
