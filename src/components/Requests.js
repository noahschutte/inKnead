import React, { Component } from 'react';
import { View, ListView, Text, StyleSheet } from 'react-native';
import Landing from './Landing';
import Request from './Request';

export default class Requests extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      loading: true,
      dataSource: ds.cloneWithRows(this._genRows({})),
      errorMessage: ' ',
    }
  }
  componentWillMount() {
    fetch('http://localhost:3000/requests')
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
      this.props.handleWelcomeUrl(responseJson.url)
      if (responseJson.errorMessage) {
        this.setState({errorMessage: responseJson.errorMessage})
      } else {
        this.props.collectRequests(responseJson.requests)
        this.setState({errorMessage: "Requests recieved."})
        this.setState({loading: !this.state.loading})
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource: ds.cloneWithRows(this._genRows({}))})
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  _renderRow(rowData) {
    return <Request request={this.props.requests[rowData]} {...this.props} />
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
    // if (this.state.errorMessage === "No current requests.") {
    //   display =
    //     <Landing noRequests key={"welcome"} {...this.props} />
    // } else if (this.state.errorMessage === "Requests recieved.") {
    //   display =
    //       {this.props.requests.map((request, i) => {
    //         return (
    //           <Request key={i} request={request} {...this.props} />
    //         )
    //       })}
    //     display.props.children.unshift(showWelcomePage);
    //   <Landing noRequests key={"welcome"} {...this.props} />
    // }

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
            />
    }
    // this._renderRow.bind(this, 0)
    // (rowData) => <Text>{rowData}</Text>
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
    borderWidth: 3,
    borderColor: 'green',
  },
  listViewContainer: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 3,
  },
  wrapper: {
    marginTop: 50,
    // flex: 1,
    // borderWidth: 3,
    borderColor: 'red',
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
  },
});
