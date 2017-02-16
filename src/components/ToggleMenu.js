import React from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { defaultProfileImage } from '../assets';
import SideMenuButton from './SideMenuButton';

const ToggleMenu = (props) => {
  let notificationAlert;
  if (props.doesHaveNotifications) {
    notificationAlert = '!';
  }
  return (
    <View style={styles.container}>

      <Image
        source={defaultProfileImage}
        style={styles.image}
      />
      <SideMenuButton onPress={() => Actions.refresh({ key: 'MainScene', sideMenuOpen: false })}>
        <Text style={styles.textStyle}>Requests</Text>
      </SideMenuButton>

      <SideMenuButton onPress={Actions.NotificationsScene}>
        <Text style={styles.textStyle}>
          Notifications <Text style={styles.notificationAlertStyle}> {notificationAlert}</Text>
        </Text>
      </SideMenuButton>

      <SideMenuButton onPress={Actions.HowToScene}>
        <Text style={styles.textStyle}>How To</Text>
      </SideMenuButton>

      <SideMenuButton onPress={props.userData ? Actions.ProfileScene : Actions.LoginScene}>
        <Text style={styles.textStyle}>Profile</Text>
      </SideMenuButton>

    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#424242',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 75,
    paddingBottom: 75,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontFamily: 'Gillsans',
  },
  notificationAlertStyle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
};

export default ToggleMenu;
