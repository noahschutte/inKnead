import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { updateEmail } from '../../actions';
import DetailSection from '../DetailSection';
import Button from '../Button2';

class EmailVerifyScene extends Component {

  state = {
    newEmailText: ''
  };

  onPress = () => {
    const { currentEmail, signupEmail, userID } = this.props;
    if (this.state.newEmailText === '') {
      const newEmail = currentEmail || signupEmail;
      this.props.updateEmail(newEmail, userID);
    } else {
      this.props.updateEmail(this.state.newEmailText, userID);
    }
  }

  updateEmailText = (newEmailText) => {
    this.setState({ newEmailText });
  }

  render() {
    const currentEmail = this.props.currentEmail || this.props.signupEmail;
    let submitButtonText;
    if (this.state.newEmailText === '') {
      submitButtonText = 'Verify!';
    } else {
      submitButtonText = 'Update!';
    }
    return (
      <View style={{ flex: 1 }}>
        <DetailSection style={styles.sectionStyle} bannerText='Current Email'>
          <Text>{currentEmail}</Text>
        </DetailSection>
        <DetailSection style={styles.sectionStyle} bannerText='New Email'>
          <TextInput
            onChangeText={this.updateEmailText}
            maxLength={254}
            autoCorrect={false}
            keyboardType='email-address'
            autOCapitalize='none'
            value={this.state.newEmailText}
            style={{ flex: 1, marginHorizontal: 15, textAlign: 'center' }}
          />
        </DetailSection>
        <DetailSection
          style={styles.buttonSectionStyle}
          contentStyle={{ justifyContent: 'space-around' }}
        >
          <Button
            touchableOpacity
            onPress={Actions.pop}
            buttonStyle={{ backgroundColor: '#bebebe', borderColor: '#bebebe' }}
          >
            <Text style={[styles.buttonStyle]}>Cancel</Text>
          </Button>
          <Button
            touchableOpacity
            onPress={this.onPress}
            buttonStyle={{ backgroundColor: '#ce0000' }}
          >
            <Text style={styles.buttonStyle}>{submitButtonText}</Text>
          </Button>
        </DetailSection>
      </View>
    );
  }
}

const styles = {
  sectionStyle: {
    flex: 4,
    marginTop: 15,
  },
  buttonSectionStyle: {
    flex: 2,
  },
  buttonStyle: {
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  }
};

const mapStateToProps = ({ user }) => {
  const currentEmail = user.userData.current_email;
  const signupEmail = user.userData.signup_email;
  const userID = user.userData.id;
  return { currentEmail, signupEmail, userID };
};

export default connect(mapStateToProps, { updateEmail })(EmailVerifyScene);
