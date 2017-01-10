import React from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { defaultProfileImage } from '../assets';
import SideMenuButton from './SideMenuButton';

const ToggleMenu = (props) => {
  return (
    <View style={styles.container}>

      <Image
        source={defaultProfileImage}
        style={styles.image}
      />
      <SideMenuButton onPress={props.togglePress}>
        <Text style={styles.textStyle}>Requests</Text>
      </SideMenuButton>

      <SideMenuButton onPress={() => Actions.NotificationsScene()}>
        <Text style={styles.textStyle}>Notifications</Text>
      </SideMenuButton>

      <SideMenuButton onPress={() => Actions.HowToScene()}>
        <Text style={styles.textStyle}>How To</Text>
      </SideMenuButton>

      <SideMenuButton onPress={() => Actions.ProfileScene()}>
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
    paddingTop: 100,
    paddingBottom: 100,
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
};

export default ToggleMenu;
