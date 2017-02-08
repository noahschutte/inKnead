import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import NavBar from '../NavBar';
import EntryVideo from '../EntryVideo';
import EntryDetails from '../EntryDetails';

class EntryScene extends Component {
  state = {
    paused: true,
  };

  onDonatePress = () => {
    if (!this.props.userData) {
      Actions.LoginScene({ redirect: {
        scene: 'EntryScene',
        parameter: this.props.entry
      } });
    } else {
      alert('exists');
    }
  }

  navigateToUser = () => {
    this.setState({ paused: true });
    Actions.UserHistoryScene({ userId: this.props.entry.creator_id });
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
          onLeftPress={Actions.pop}
        />
        <View style={{ flex: 9, backgroundColor: 'white' }}>
          <EntryVideo
            togglePlay={this.togglePlay}
            source={entry.compressed_video}
            paused={this.state.paused}
          />
          <EntryDetails
            entryData={entry}
            navigateToUser={this.navigateToUser}
            onDonatePress={this.onDonatePress}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return user;
};

const styles = {
  container: {
    flex: 1,
  },
};

export default connect(mapStateToProps, {})(EntryScene);
