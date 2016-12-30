import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getEntries } from '../../actions';
import NavBar from '../NavBar';


class MainScene extends Component {

  componentWillMount() {
    this.props.getEntries();
  }

  assembleOptions = () => {

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          rightButton='newRequest'
          leftButton='sideMenu'
          title='Main'
        />
        <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Main Scene</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    requests: state.entries.requests,
    thankYous: state.entries.thankYous,
    loading: state.entries.loading,
  };
};

export default connect(mapStateToProps, { getEntries })(MainScene);
