import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { defaultProfileImage, facebookImage } from '../../assets';
import ProfileImage from '../ProfileImage';
import DetailSection from '../DetailSection';
import ProfileDetailButton from '../ProfileDetailButton';

class ProfileScene extends Component {

  shouldComponentUpdate(nextProps) {
    if (nextProps.user.userData === null) {
      return false;
    }
    return true;
  }

  render() {
    /* eslint camelcase: off */
    const {
      current_email,
      signup_email,
      fb_userID,
    } = this.props.user.userData;
    const email = current_email || signup_email;
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
              onPress={Actions.LoginScene.bind(this, { logOut: true })}
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
