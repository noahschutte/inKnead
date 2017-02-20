import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { defaultProfileImage, facebookImage } from '../../assets';
import ProfileImage from '../ProfileImage';
import DetailSection from '../DetailSection';
import ProfileDetailButton from '../ProfileDetailButton';

class ProfileScene extends Component {
  render() {
    if (!this.props.user.userData) {
      console.log('reached');
      return (
        <View>
          <Text>How did you get here</Text>
        </View>
      );
    }
    /* eslint camelcase: off */
    const {
      current_email,
      signup_email,
      fb_userID,
    } = this.props.user.userData;
    let email;
    if (current_email) {
      email = current_email;
    } else {
      email = signup_email;
    }
    let social;
    if (fb_userID) {
      social = 'Facebook';
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#cfcfcf' }}>
        <ProfileImage image={defaultProfileImage} />
        <View style={{ flex: 5 }}>
          <DetailSection bannerText='Email Address'>
            <ProfileDetailButton onPress={Actions.EmailVerifyScene}>
              {email}
            </ProfileDetailButton>
          </DetailSection>
          <DetailSection bannerText='Linked Accounts'>
            <ProfileDetailButton
              onPress={Actions.LoginScene.bind(this, {
                // type: 'reset',
                // backScene: {
                //   scene: 'ProfileScene',
                // },
                logOut: true
              })}
              marginImage={facebookImage}
            >
              {social}
            </ProfileDetailButton>
          </DetailSection>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, {})(ProfileScene);
