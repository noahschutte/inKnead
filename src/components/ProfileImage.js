import React from 'react';
import { View, Image } from 'react-native';

const ProfileImage = (props) => {
  return (
    <View style={styles.container}>
      <Image source={props.image} style={styles.profileImageStyle} />
    </View>
  );
};

const styles = {
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageStyle: {
    resizeMode: 'contain',
    borderRadius: 120,
    width: 120,
    height: 120,
  },
};

export default ProfileImage;
