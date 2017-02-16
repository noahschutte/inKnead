import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { confirmDonation } from '../../actions';
import EntryVideo from '../EntryVideo';
import EntryDetails from '../EntryDetails';

class EntryScene extends Component {
  state = {
    paused: true,
    thanksText: 'YAY PIZZA!'
  };

  onDonatePress = () => {
    this.setState({ paused: true });
    const { userData, entry } = this.props;
    // Direct user to log in if not logged in already
    if (!userData) {
      Actions.LoginScene({ redirect: {
        scene: 'EntryScene',
        parameter: entry
      } });
    } else if (userData.id === entry.creator_id) {
      alert('You can\'t donate to yourself!');
    } else if (this.props.activeDonation) {
      alert('You must complete your recent donation commitment!');
    } else {
      Alert.alert(
        `Are you sure you want to donate ${entry.pizzas} pizza(s)?`,
        'You will have 30 minutes to send an online gift card',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Donate',
            onPress: this.confirmDonation
          }
        ]
      );
    }
  }

  onThankYouPress = () => {
    let thanksText = this.state.thanksText;
    thanksText += ' PIZZA!';
    this.setState({ thanksText });
  }

  confirmDonation = () => {
    this.props.confirmDonation(this.props.userData.id, this.props.entry);
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
    const showUserHistory = (this.props.origin === 'MainScene');
    let onButtonPress;
    let buttonText;

    if (entry.type === 'request') {
      if (entry.donor_id === null) {
        onButtonPress = this.onDonatePress;
        buttonText = 'DONATE!';
      } else {
        onButtonPress = null;
        buttonText = 'RECEIVED!';
      }
    } else {
      onButtonPress = this.onThankYouPress;
      buttonText = this.state.thanksText;
    }

    return (
      <View style={styles.container}>
        <EntryVideo
          togglePlay={this.togglePlay}
          source={entry.compressed_video}
          paused={this.state.paused}
        />
        <EntryDetails
          showUserHistory={showUserHistory}
          entryData={entry}
          navigateToUser={this.navigateToUser}
          onButtonPress={onButtonPress}
          buttonText={buttonText}
        />
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

export default connect(mapStateToProps, { confirmDonation })(EntryScene);
