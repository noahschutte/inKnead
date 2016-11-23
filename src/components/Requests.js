import React, { Component } from 'react';
import { View, ListView, RefreshControl, Text, StyleSheet } from 'react-native';
import Request from './Request';

export default class Requests extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activity: [],
      refreshing: false,
      loading: true,
      dataSource: null,
      errorMessage: ' ',
    }
  }
  _onRefresh() {
    this.setState({refreshing: true});
    fetch('https://in-knead.herokuapp.com/requests')
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
      this.props.handleWelcomeUrl(responseJson.url)
      if (responseJson.errorMessage) {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.props.collectRequests(responseJson.requests)
        this.props.collectThankYous(responseJson.thankYous)
      }
    })
    .then((arbitrary) => {
      this.setState({activity: []})
      if (this.props.requests) {
        this.setState({activity: this.state.activity.concat(this.props.requests)})
      }
      if (this.props.thankYous) {
        this.setState({activity: this.state.activity.concat(this.props.thankYous)})
      }
    })
    .then((arbitrary) => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({dataSource: ds.cloneWithRows(this._genRows({}))})
    })
    .then((arbitrary) => {
      this.setState({refreshing: false});
    })
    .catch((error) => {
      console.error(error);
    });
  }
  componentWillMount() {
    fetch('https://in-knead.herokuapp.com/requests')
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
      this.props.handleWelcomeUrl(responseJson.url)
      if (responseJson.errorMessage) {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.props.collectRequests(responseJson.requests)
        this.props.collectThankYous(responseJson.thankYous)
      }
    })
    .then((arbitrary) => {
      if (this.props.requests) {
        this.setState({activity: this.state.activity.concat(this.props.requests)})
      }
      if (this.props.thankYous) {
        this.setState({activity: this.state.activity.concat(this.props.thankYous)})
      }
    })
    .then((arbitrary) => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({dataSource: ds.cloneWithRows(this._genRows({}))})
    })
    .then((arbitrary) => {
      this.setState({loading: false})
    })
    .catch((error) => {
      console.error(error);
    });
  }
  _renderRow(rowData) {
    this.state.activity.sort(function(a, b) {
      return parseFloat(a.seconds) - parseFloat(b.seconds);
    });
    return <Request selectedRequest={this.state.activity[rowData]} {...this.props} />
  }
  _genRows() {
    let activityLength = this.state.activity.length
    let result = [];
    for (let i = 0; i < activityLength; i += 1) {
      result.push(i)
    }
    return result
  }
  render() {
    let display;
    if (this.state.loading || this.state.refreshing || this.state.dataSource === null) {
      display = <Text>Loading...</Text>
    } else if (this.state.activity.length === 0) {
      display = <Text>No Activity Recorded.</Text>
    } else {
      display =
          <ListView
            style={styles.listViewContainer}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            enableEmptySections={true}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                />
            }
            />
    }
    return (
      <View style={styles.container}>
        {display}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: 'white',
  },
  listViewContainer: {
    flex: 1,
  },
});
