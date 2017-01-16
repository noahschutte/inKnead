import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ProfileDetailButton = props => {
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.email}>{props.children}</Text>
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }} onPress={() => console.log('pressed')}>
          <Text style={{ fontSize: 22, marginTop: -5 }}> > </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = {
  email: {
    flex: 9,
    fontSize: 16,
    textAlign: 'center',
  },
  line: {
    backgroundColor: '#aaa',
    flex: 1,
    height: 1,
  }
};

export default ProfileDetailButton;
