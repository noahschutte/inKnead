import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { redirectTo } from '../../actions';
import Button from '../Button2';
import DetailSection from '../DetailSection';

class NotificationsScene extends Component {

  state = {
    expanded: [],
  }

  onPress = (action) => {
    switch (action) {
      case 'nothing':
        return () => alert('this will work eventually');
      default:
        return action;
    }
  }

  buttonContent = (notification) => {
    const { text, expandable, id } = notification;
    if (expandable && this.state.expanded.indexOf(id) !== -1) {
      return (
        <DetailSection contentStyle={{ flexDirection: 'column' }}>
          <Text style={styles.text}>{text}</Text>
          <Text style={[styles.text, styles.subText]}>{expandable.text}</Text>
          <DetailSection contentStyle={{ justifyContent: 'space-around' }}>

            {expandable.buttons.map(button => {
              return (
                <Button
                  key={id + button.type}
                  touchableOpacity
                  buttonType={button.type}
                  onPress={this.onPress(button.action)}
                >
                  {button.text}
                </Button>
              );
            })}

          </DetailSection>
        </DetailSection>
      );
    }
    return (
      <DetailSection>
        <Text style={styles.text}>{text}</Text>
      </DetailSection>
    );
  }

  expandNotification = (id) => {
    const expanded = [id, ...this.state.expanded];
    this.setState({ expanded });
  }

  collapseNotification = (index) => {
    const expanded = [...this.state.expanded];
    expanded.splice(index, 1);
    this.setState({ expanded });
  }

  render() {
    const { redirectTo, notifications } = this.props;
    let content;
    if (notifications.length > 0) {
      content = notifications.map(notification => {
        let onPress;
        if (notification.redirect) {
          onPress = () => redirectTo(notification.redirect);
        } else if (notification.expandable) {
          const index = this.state.expanded.indexOf(notification.id);
          if (index === -1) {
            onPress = () => this.expandNotification(notification.id);
          } else {
            onPress = () => this.collapseNotification(index);
          }
        }
        const buttonContent = this.buttonContent(notification);
        return (
          <View key={notification.text} style={{ marginTop: 10 }}>
            <Button touchableOpacity onPress={onPress}>
              {buttonContent}
            </Button>
          </View>
        );
      });
    } else {
      content = <Text style={{ textAlign: 'center', marginTop: 50 }}>Nothing to show...</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
          {content}
      </View>
    );
  }
}

const styles = {
  text: {
    textAlign: 'center',
    fontSize: 22,
    padding: 5,
    fontWeight: 'bold',
    color: '#00cece',
  },
  subText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'black',
  },
};

const mapStateToProps = ({ user }) => {
  const { notifications } = user;
  return { notifications };
};

export default connect(mapStateToProps, { redirectTo })(NotificationsScene);
