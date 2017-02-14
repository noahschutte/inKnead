import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { redirectTo } from '../../actions';
import NavBar from '../NavBar';
import Button from '../Button2';

class NotificationsScene extends Component {
  render() {
    const { redirectTo } = this.props;
    let content;
    if (this.props.notifications.length > 0) {
      content = this.props.notifications.map(notification => {
        return (
          <View key={notification.text} style={{ marginTop: 5 }}>
            <Button
              touchableOpacity
              onPress={() => redirectTo(notification.redirect)}
            >
              {notification.text}
            </Button>
          </View>
        );
      });
    } else {
      content = <Text style={{ textAlign: 'center', marginTop: 50 }}>Nothing to show...</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          leftButton='backButton'
          onLeftPress={Actions.pop}
        />
        <View style={{ flex: 9 }}>
          {content}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { notifications } = user;
  return { notifications };
};

export default connect(mapStateToProps, { redirectTo })(NotificationsScene);
