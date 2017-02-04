import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import SpinningPizza from '../SpinningPizza';

const UploadingScene = () => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.animationContainer}>
        <SpinningPizza />
      </View>
      <Text style={styles.textStyle}>Uploading...</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    flex: 1,
  },
  textStyle: {
    flex: 2,
  }
};

const mapStateToProps = ({ newEntry }) => {
  const { uploadPercentage } = newEntry;
  return { uploadPercentage };
};

export default connect(mapStateToProps, {})(UploadingScene);
