import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavBar from '../NavBar';
import EntryVideo from '../EntryVideo';
import EntryDetails from '../EntryDetails';

class EntryScene extends Component {
  constructor() {
    super();

    this.state = {
      paused: true,
    };
  }

  togglePlay = (toggle) => {
    this.setState({ paused: toggle });
  }

  render() {
    const { entry } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          leftButton='backButton'
          onLeftPress={() => Actions.pop()}
        />
        <View style={{ flex: 9, backgroundColor: 'white' }}>
          <EntryVideo
            togglePlay={this.togglePlay}
            source={entry.compressed_video}
            paused={this.state.paused}
          />
          <EntryDetails
            entryData={entry}
          />
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
  },
  detailsContainer: {
    flex: 5,
  },
};

export default EntryScene;
