import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import {
  CameraScene,
  EmailVerifyScene,
  EntryCreationScene,
  EntryScene,
  HowToScene,
  InitialScene,
  InstructionsScene,
  LoadingScene,
  LoginScene,
  MainScene,
  NotificationsScene,
  ProfileScene,
  UploadingScene,
  UserHistoryScene,
} from './components/Scenes';

const RouterComponent = () => {
  return (
    <Router hideNavBar >
      <Scene
        initial
        key="InitialScene"
        component={InitialScene}
      />
      <Scene
        key="InstructionsScene"
        component={InstructionsScene}
      />
      <Scene
        key="EmailVerifyScene"
        component={EmailVerifyScene}
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
