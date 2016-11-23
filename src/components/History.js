import React, { Component } from 'react';
import { View, ListView, RefreshControl, Text, StyleSheet } from 'react-native';
import Request from './Request';

export default class History extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userHistory: [],
      refreshing: false,
      loading: true,
      dataSource: null,
      errorMessage: ' ',
    }
  }
  _onRefresh() {
    this.setState({refreshing: true});
    const userID = this.props.user.id
    fetch(`https://in-knead.herokuapp.com/users/${userID}`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
      this.props.handleWelcomeUrl(responseJson.url)
      if (responseJson.errorMessage) {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.props.collectUserRequests(responseJson.userRequests)
        this.props.collectUserThankYous(responseJson.userThankYous)
      }
    })
    .then((arbitrary) => {
      this.setState({userHistory: []})
      if (this.props.userRequests) {
        this.setState({userHistory: this.state.userHistory.concat(this.props.userRequests)})
      }
      if (this.props.userThankYous) {
        this.setState({userHistory: this.state.userHistory.concat(this.props.userThankYous)})
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
    if (this.props.user) {
      const userID = this.props.user.id
      fetch(`https://in-knead.herokuapp.com/users/${userID}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
        this.props.handleWelcomeUrl(responseJson.url)
        if (responseJson.errorMessage) {
          this.setState({errorMessage: responseJson.errorMessage})
        } else {
          this.props.collectUserRequests(responseJson.userRequests)
          this.props.collectUserThankYous(responseJson.userThankYous)
        }
      })
      .then((arbitrary) => {
        if (this.props.userRequests) {
          this.setState({userHistory: this.state.userHistory.concat(this.props.userRequests)})
        }
        if (this.props.userThankYous) {
          this.setState({userHistory: this.state.userHistory.concat(this.props.userThankYous)})
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
  }
  _renderRow(rowData) {
    this.state.userHistory.sort(function(a, b) {
      return parseFloat(a.seconds) - parseFloat(b.seconds);
    });
    return <Request history selectedRequest={this.state.userHistory[rowData]} {...this.props} />
  }
  _genRows() {
    let userHistoryLength = this.state.userHistory.length
    let result = [];
    for (let i = 0; i < userHistoryLength; i += 1) {
      result.push(i)
    }
    return result
  }
  render() {
    let display;
    if (this.state.loading || this.state.refreshing || this.state.dataSource === null) {
      display = <Text>Loading...</Text>
    } else if (this.state.userHistory.length === 0) {
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
