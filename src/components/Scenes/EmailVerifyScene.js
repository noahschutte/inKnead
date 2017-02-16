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

  updateEmailText = (newEmailText) => {
    this.setState({ newEmailText });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DetailSection style={styles.sectionStyle} bannerText='Current Email'>
          <Text>{this.props.currentEmail}</Text>
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
            onPress={() => this.props.updateEmail(this.state.newEmailText, this.props.userID)}
            buttonStyle={{ backgroundColor: '#ce0000' }}
          >
            <Text style={styles.buttonStyle}>Save</Text>
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
  const userID = user.userData.id;
  return { currentEmail, userID };
};

export default connect(mapStateToProps, { updateEmail })(EmailVerifyScene);
