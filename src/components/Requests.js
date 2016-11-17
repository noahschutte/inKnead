import React, { Component } from 'react';
import { View, ListView, RefreshControl, Text, StyleSheet } from 'react-native';
import Request from './Request';

export default class Requests extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      refreshing: false,
      loading: true,
      dataSource: ds.cloneWithRows(this._genRows({})),
      errorMessage: ' ',
    }
  }
  _onRefresh() {
    this.setState({refreshing: true});
    fetch('http://192.168.0.101:3000/requests')
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
      this.props.handleWelcomeUrl(responseJson.url)
      if (responseJson.errorMessage) {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.props.collectRequests(responseJson.requests)
        this.setState({errorMessage: "Requests recieved."})
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource: ds.cloneWithRows(this._genRows({}))})
      }
    })
    .catch((error) => {
      console.error(error);
    });
    this.setState({refreshing: false});
  }
  componentWillMount() {
    if (this.props.requests === null) {
      fetch('http://192.168.0.101:3000/requests')
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
        this.props.handleWelcomeUrl(responseJson.url)
        if (responseJson.errorMessage) {
          this.setState({errorMessage: responseJson.errorMessage})
        } else {
          this.props.collectRequests(responseJson.requests)
          this.setState({errorMessage: "Requests recieved."})
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({dataSource: ds.cloneWithRows(this._genRows({}))})
        }
        this.setState({loading: false})
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      this.setState({loading: false})
    }
  }
  _renderRow(rowData) {
    return <Request selectedRequest={this.props.requests[rowData]} {...this.props} />
  }
  _genRows() {
    if (this.props.requests) {
      let requestsLength = this.props.requests.length
      let result = [];
      for (let i = 0; i < requestsLength; i += 1) {
        result.push(i)
      }
      return result
    } else {
      return [0]
    }
  }
  render() {
    let display;
    if (this.state.loading) {
      display =
          <Text>Loading...</Text>
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
