import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const SortButton = (props) => {
  return (
    <View style={styles.sortButtonStyle}>
      <Text style={styles.sortButtonText}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = {
  sortButtonStyle: {
    backgroundColor: '#ce0000',
    paddingTop: 5,
    flex: 1,
    borderLeftWidth: 1,
    borderRightWidth: 0.5,
    borderColor: '#fff',
    alignItems: 'center'
  },
  sortButtonText: {
    color: '#fff',
  },
};

export default SortButton;
