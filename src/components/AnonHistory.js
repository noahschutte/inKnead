import React, { Component } from 'react';
import { View, ListView, RefreshControl, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Entry from './Entry';

export default class AnonHistory extends Component {
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
    const anonID = this.props.anonID
    this.setState({refreshing: true});
    fetch(`https://in-knead.herokuapp.com/anon/${anonID}`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorMessage === "No activity.") {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.props.collectAnonHistory(responseJson.anonHistory)
        this.setState({errorMessage: "History received."})
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
    const anonID = this.props.anonID
    fetch(`https://in-knead.herokuapp.com/anon/${anonID}`)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorMessage === "No activity.") {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.props.collectAnonHistory(responseJson.anonHistory)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource: ds.cloneWithRows(this._genRows({}))})
        this.setState({errorMessage: "History received."})
      }
    })
    .catch((error) => {
      console.error(error);
    });
    this.setState({loading: false})
  }
  _renderRow(rowData) {
    if (this.props.anonHistory) {
      return <Entry selectedEntry={this.props.anonHistory[rowData]} {...this.props} />
    }
  }
  _genRows() {
    if (this.props.anonHistory) {
      let requestsLength = this.props.anonHistory.length
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
    } else if (!this.props.anonHistory) {
      display =
        <Text>
          No Activity Recorded.
        </Text>
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
    // borderColor: 'blue',
    // borderWidth: 3,
  },
  // wrapper: {
  //   marginTop: 50,
    // flex: 1,
    // borderWidth: 3,
    // borderColor: 'red',
  // },
  text: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
  },
})
