import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { SegmentedControls } from 'react-native-radio-buttons';
import Nav from './Nav';
import GuestView from './GuestView';
import Video from './Video';
import { RNS3 } from 'react-native-aws3';
import Camera from 'react-native-camera';

export default class NewRequest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pizzas: '',
      vendor: '',
      videoKey: '',
      uploading: false,
      progress: null,
    };
    this.onPizzasChange = this.onPizzasChange.bind(this);
    this.onVendorChange = this.onVendorChange.bind(this);
  }
  onPizzasChange(pizzas) {
    this.setState({pizzas})
  }
  onVendorChange(vendor) {
    this.setState({vendor})
  }
  // uploadFile(file, signedRequest) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('PUT', signedRequest);
  //   xhr.onreadystatechange = function() {
  //     if (xhr.readyState === 4) {
  //       if(xhr.status === 200) {
  //         console.log("success");
  //       } else {
  //         console.log("failure");
  //       }
  //       this.setState({uploading: false})
  //     }
  //   };
  //   xhr.send(file);
  // };
  onSubmitRequest() {
    const userID = this.props.user.id
    const first_name = this.props.user.first_name
    if (!this.props.videoData) {
      this.props.onChangeNewRequestErrorMesssage('Please record a video.')
    } else if (this.state.pizzas.length < 1) {
      this.props.onChangeNewRequestErrorMesssage('Please select how many pizzas you need.')
    } else if (this.state.vendor.length < 5) {
      this.props.onChangeNewRequestErrorMesssage('Please choose your preferred pizza place.')
    } else {
      this.props.onChangeNewRequestErrorMesssage(' ')

      let dateTime = Date.now()
      let fbUserId = this.props.user.fb_userID
      let videoKey = `${fbUserId}`+`${dateTime}`

      let file = {
        uri: this.props.videoData.path,
        name: videoKey,
        type: "video/quicktime"
      }

      const {
        pizzas,
        vendor,
      } = this.state;

      fetch('https://in-knead.herokuapp.com/requests', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          userID,
          first_name,
          pizzas,
          vendor,
          videoKey
        })
      })
      .then((response) => {
        return response.json()})
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        if (responseJson.errorMessage) {
          this.props.onChangeNewRequestErrorMesssage(responseJson.errorMessage)
        } else {
          this.setState({uploading: true})
          this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
          this.props.collectRequests(responseJson.requests)
          console.log("start fetch with signedRequest");
          const url = responseJson.signedRequest
          // this.uploadFile.bind(this, file, url)
          const xhr = new XMLHttpRequest();
          const that = this;
          xhr.open('PUT', url);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              if(xhr.status === 200) {
                console.log("success");
                that.props.onChangeVideoData(null)
                that.props.navigator.resetTo({name: 'main'});

              } else {
                console.log("failure");
                const userID = that.props.user.id
                fetch(`https://in-knead.herokuapp.com/requests/1`, {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: 'DELETE',
                  body: JSON.stringify({videoKey})
                })
                .then((response) => {
                  return response.json()
                })
                .then((responseJson) => {
                  if (responseJson.requests) {
                    that.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
                    that.props.collectRequests(responseJson.requests)
                    that.props.onChangeNewRequestErrorMesssage(responseJson.errorMessage)
                  } else {
                    that.props.onChangeNewRequestErrorMesssage(responseJson.errorMessage)
                  }
                  that.setState({uploading: false})
                })
                .catch((error) => {
                  console.error(error);
                });
                that.setState({uploading: false})
              }
            }
          };
          xhr.send(file);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  // RNS3.put(file, options)
  // .then(response => {
  //   if (response.status !== 201) {
  //     const userID = this.props.user.id
  //     fetch(`https://in-knead.herokuapp.com/requests/1`, {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       method: 'DELETE',
  //       body: JSON.stringify({videoKey})
  //     })
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((responseJson) => {
  //       if (responseJson.requests) {
  //         this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas)
  //         this.props.collectRequests(responseJson.requests)
  //         this.props.onChangeNewRequestErrorMesssage(responseJson.errorMessage)
  //       } else {
  //         this.props.onChangeNewRequestErrorMesssage(responseJson.errorMessage)
  //       }
  //       this.setState({uploading: false})
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   } else {
  //     this.props.onChangeVideoData(null)
  //     this.props.navigator.resetTo({name: 'main'});
  //   }
  // })
  // .progress((e) => this.setState({progress: (e.loaded / e.total)}))


  openVideoRec() {
    Camera.checkDeviceAuthorizationStatus()
    .then((response) => {
      if (response) {
        this.props.onChangeNewRequestErrorMesssage("")
        this.props.navigator.push({name: 'camera'});
      } else {
        this.props.onChangeNewRequestErrorMesssage("Go to Settings and allow 'in knead' to access the Camera and Microphone.")
      }
    })
  }
  selectPizzas(pizzas){
    this.setState({pizzas});
  }
  selectVendor(vendor){
    this.setState({vendor});
  }
  render() {
    const pizzas= [
      1,
      2,
      3,
    ];
    const vendors= [
      "Papa Johns",
      "Dominos",
      "Pizza Hut",
    ];
    let videoDisplay;
    if (this.props.videoData) {
      videoDisplay =
        <Video preview {...this.props} />
    }
    let recordButtonDisplay;
    if (this.props.videoData) {
      recordButtonDisplay = 'Re-Record'
    } else {
      recordButtonDisplay = 'Record'
    }
    let display;
    if (this.state.uploading) {
      display =
        <View style={styles.container}>
          <Text>
            Please wait while your request video is being uploaded
          </Text>
          <Text>
            {this.state.progress}
          </Text>
        </View>
    } else if (this.props.user === null) {
      display =
        <View style={styles.container}>
          <Nav backButton {...this.props} />
          <GuestView {...this.props} />
        </View>
    } else {
      display =
        <View style={styles.container}>
          <Nav backButton {...this.props} />
          <View style={styles.wrapper}>
            <View style={styles.videoContainer}>
              {videoDisplay}
            </View>
            <View style={styles.formContainer}>

              <View>
                <Button
                  color='#ce0000'
                  text={recordButtonDisplay}
                  onPress={this.openVideoRec.bind(this)}
                  />
              </View>

              <View style={styles.banner}>
                <Text style={styles.bannerText}>
                  # OF PIZZAS
                </Text>
              </View>

            <View style={styles.pizza}>
              <SegmentedControls
                tint={'#ce0000'}
                options={ pizzas }
                onSelection={ this.selectPizzas.bind(this) }
                selectedOption={ this.state.pizzas }
                />
            </View>
            <View style={styles.banner}>
              <Text style={styles.bannerText}>
              VENDOR NEAR YOU
              </Text>
            </View>
            <View style={styles.controls}>

              <View style={styles.banner}>
                <Text style={styles.bannerText}>
                VENDOR NEAR YOU
                </Text>
              </View>

              <SegmentedControls
                tint={'#ce0000'}
                fontSize={50}
                options={ vendors }
                onSelection={ this.selectVendor.bind(this) }
                selectedOption={ this.state.vendor }
                />

            </View>
            <View style={styles.errorContainer}>
              <Text style={styles.error}>
                {this.props.newRequestErrorMessage}
              </Text>
            </View>


            <Button
              color='#ce0000'
              text={'Submit Request'}
              onPress={this.onSubmitRequest.bind(this)}
              />

              <View style={styles.errorContainer}>
                <Text style={styles.error}>
                  {this.props.newRequestErrorMessage}
                </Text>
              </View>


              <Button
                style={styles.submitButton}
                text={'Submit Request'}
                onPress={this.onSubmitRequest.bind(this)}
                />
            </View>
          </View>
        </View>
    }
    console.log("progress", this.state.progress);
    return (
      <View style={styles.container}>
        {display}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 9,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    // borderWidth: 3,
  },
  videoContainer: {
    flex: 2,
    borderColor: 'green',
    borderWidth: 2,
  },
  formContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 50,
    paddingTop: 20
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#424242',
    alignSelf: 'stretch',
    padding: 5
  },
  bannerText: {
    color: 'white',
  },
  formTitle: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  },
  pizza: {
    width: 250,
  },
  controls: {
    width: 300
  },
  instructions: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 15,
  },
  pizzas: {
    tintColor: 'red',
    fontWeight: 'bold',
  },
  vendor: {

  },
  errorContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  error: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ce0000',
  },
});
