import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import * as Scenes from './components/Scenes';
import NavBar from './components/NavBar';

const RouterComponent = () => {
  const sceneStyle = {
    marginTop: 54,
  };
  const mainSceneNavProps = {
    rightButton: 'newRequest',
    leftButton: 'sideMenu',
    title: 'requests_and_thank_yous',
  };
  return (
    <Router >
      <Scene
        initial
        hideNavBar
        key="InitialScene"
        component={Scenes.InitialScene}
      />
      <Scene key="root" navBar={NavBar}>
        <Scene
          initial
          navBarProps={mainSceneNavProps}
          sideMenuOpen={false}
          sceneStyle={sceneStyle}
          key="MainScene"
          component={Scenes.MainScene}
        />
        <Scene
          sceneStyle={sceneStyle}
          key="InstructionsScene"
          component={Scenes.InstructionsScene}
        />
        <Scene
          sceneStyle={sceneStyle}
          key="EmailVerifyScene"
          component={Scenes.EmailVerifyScene}
        />
        <Scene
          sceneStyle={sceneStyle}
          key="LoadingScene"
          component={Scenes.LoadingScene}
        />
        <Scene
          sceneStyle={sceneStyle}
          key="UploadingScene"
          component={Scenes.UploadingScene}
        />
        <Scene
          sceneStyle={sceneStyle}
          key="EntryCreationScene"
          component={Scenes.EntryCreationScene}
        />
        <Scene
          sceneStyle={sceneStyle}
          key="EntryScene"
          component={Scenes.EntryScene}
        />
        <Scene
          sceneStyle={sceneStyle}
          key="HowToScene"
          component={Scenes.HowToScene}
        />
        <Scene
          sceneStyle={sceneStyle}
          key="NotificationsScene"
          component={Scenes.NotificationsScene}
        />
        <Scene
          sceneStyle={sceneStyle}
          key="ProfileScene"
          component={Scenes.ProfileScene}
        />
        <Scene
          sceneStyle={sceneStyle}
          key="UserHistoryScene"
          component={Scenes.UserHistoryScene}
        />
        <Scene
          sceneStyle={sceneStyle}
          key="LoginScene"
          component={Scenes.LoginScene}
        />
        <Scene
          sceneStyle={sceneStyle}
          key="CameraScene"
          component={Scenes.CameraScene}
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
