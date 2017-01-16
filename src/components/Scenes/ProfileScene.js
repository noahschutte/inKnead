import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { defaultProfileImage } from '../../assets';
import NavBar from '../NavBar';
import ProfileImage from '../ProfileImage';
import DetailSection from '../DetailSection';
import ProfileDetailButton from '../ProfileDetailButton';

class ProfileScene extends Component {
  render() {
    console.log(this.props);
    /* eslint camelcase: off */
    const { current_email, signup_email } = this.props.user.userData;
    let email;
    if (current_email) {
      email = current_email;
    } else {
      email = signup_email;
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#bfbfbf' }}>
        <NavBar
          onLeftPress={Actions.pop}
          leftButton='backButton'
        />
        <View style={{ flex: 9 }}>
          <ProfileImage image={defaultProfileImage} />
          <View style={{ flex: 5 }}>
            <DetailSection bannerText='Email Address'>
              <ProfileDetailButton>
                {email}
              </ProfileDetailButton>
            </DetailSection>
            <DetailSection bannerText='Linked Accounts'>
              <Text>Facebook</Text>
            </DetailSection>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, {})(ProfileScene);
