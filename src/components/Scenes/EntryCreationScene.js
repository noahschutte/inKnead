import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  updateSelectedPizzas,
  updateSelectedVendor,
} from '../../actions';
import NavBar from '../NavBar';
// import EntryVideo from '../EntryVideo';
import EntryCreationForm from '../EntryCreationForm';

class EntryCreationScene extends Component {
  render() {
    console.log(this.props);
    const {
      pizzas,
      updateSelectedPizzas,
      vendor,
      updateSelectedVendor,
    } = this.props;
    return (
      <View style={{ flex: 1 }} >
        <NavBar
          leftButton='backButton'
          onLeftPress={Actions.pop}
        />
        <View style={{ flex: 9 }}>
          <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Video placeholder</Text>
          </View>
          <EntryCreationForm
            updateSelectedPizzas={updateSelectedPizzas}
            pizzas={pizzas}
            updateSelectedVendor={updateSelectedVendor}
            vendor={vendor}
          />
          <Text>ENTRY CREATION SCENE</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ newEntry }) => {
  const {
    pizzas,
    vendor,
    videoKey,
    uploading,
    progress,
    paused,
    uploadPercentage,
    uploadStatus,
  } = newEntry;
  return {
    pizzas,
    vendor,
    videoKey,
    uploading,
    progress,
    paused,
    uploadPercentage,
    uploadStatus
  };
};

export default connect(mapStateToProps, {
  updateSelectedPizzas,
  updateSelectedVendor
})(EntryCreationScene);
