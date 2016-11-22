import React, { Component } from 'react';
import { View, ListView, RefreshControl, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Request from './Request';

export default class AnonHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      anonHistory: [],
      refreshing: false,
      loading: true,
      dataSource: null,
      errorMessage: ' ',
    }
  }
  _onRefresh() {
    this.setState({refreshing: true});
    const anonID = this.props.anonID
    fetch(`http://192.168.0.101:3000/anon/${anonID}`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorMessage === "No activity.") {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.props.collectAnonRequests(responseJson.anonRequests)
        this.props.collectAnonThankYous(responseJson.anonThankYous)
        this.setState({errorMessage: "History received."})
      }
    })
    .then((arbitrary) => {
      this.setState({anonHistory: []})
      this.setState({anonHistory: this.state.anonHistory.concat(this.props.anonRequests)})
      this.setState({anonHistory: this.state.anonHistory.concat(this.props.anonThankYous)})
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
    const anonID = this.props.anonID
    fetch(`http://192.168.0.101:3000/anon/${anonID}`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorMessage === "No activity.") {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.props.collectAnonRequests(responseJson.anonRequests)
        this.props.collectAnonThankYous(responseJson.anonThankYous)
        this.setState({errorMessage: "History received."})
      }
    })
    .then((arbitrary) => {
      this.setState({anonHistory: this.state.anonHistory.concat(this.props.anonRequests)})
      this.setState({anonHistory: this.state.anonHistory.concat(this.props.anonThankYous)})
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
    return <Request anonActivity selectedRequest={this.state.anonHistory[rowData]} {...this.props} />
  }
  _genRows() {
    let anonHistoryLength = this.state.anonHistory.length
    let result = [];
    for (let i = 0; i < anonHistoryLength; i += 1) {
      result.push(i)
    }
    return result
  }
  render() {
    let display;
    if (this.state.loading || this.state.refreshing || this.state.dataSource === null) {
      display = <Text>Loading...</Text>
    } else if (this.state.anonHistory.length === 0) {
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
        <Nav backButton {...this.props} />
        <View style={styles.wrapper}>
          {display}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 9,
  },
  listViewContainer: {
    flex: 1,
  },
})
