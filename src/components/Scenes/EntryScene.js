import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavBar from '../NavBar';
import EntryVideo from '../EntryVideo';
import EntryDetails from '../EntryDetails';

class EntryScene extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar
          leftButton='backButton'
          onLeftPress={() => Actions.pop()}
        />
        <View style={{ flex: 9, backgroundColor: 'white' }}>
          <EntryVideo
            source={this.props.entry.compressed_video}
          />
          <EntryDetails />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 4,
    // borderWidth: 2,
    // borderColor: 'blue',
  },
  detailsContainer: {
    flex: 5,
    // borderWidth: 2,
    // borderColor: 'green',
  },
};

export default EntryScene;
