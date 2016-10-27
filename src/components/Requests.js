import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Request from './Request';
import Landing from './Landing';

export default class Requests extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errorMessage: ' ',
    };
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
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    let requests;
    let display;

    console.log("requests", this.props.requests.length > 0);

    if (this.props.requests.length > 0) {
      requests =
      <Request request={this.props.requests[0]} {...this.props} />
        // {this.props.requests.map((request, i) => {
          // return (
            // <Request key={i} request={request} {...this.props} />
          // )
        // })}
    }


    const showWelcomePage = <Landing key={"welcome"} {...this.props} />

    if (this.state.errorMessage === "No current requests.") {
      display =
        <Landing noRequests key={"welcome"} {...this.props} />
    } else if (this.state.errorMessage === "Requests recieved.") {
      // display =
      //     {this.props.requests.map((request, i) => {
      //       return (
      //         <Request key={i} request={request} {...this.props} />
      //       )
      //     })}
        // display.props.children.unshift(showWelcomePage);
      <Landing noRequests key={"welcome"} {...this.props} />
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {requests}
        </ScrollView>
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
  scrollView: {
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
