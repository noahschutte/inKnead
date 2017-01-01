import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { sortEntries } from '../actions';


const SortButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.sortButtonStyle}
      onPress={props.sortEntries(props.children)}
    >
      <Text style={styles.sortButtonText}>
        {props.children}
      </Text>
    </TouchableOpacity>
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

export default connect(null, { sortEntries })(SortButton);
