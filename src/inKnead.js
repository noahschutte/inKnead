import React, { Component } from 'react';
import { Navigator } from 'react-native';
import FBSDK, { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import AnonHistory from './components/AnonHistory';
import Camera from './components/Camera';
import CreateThankYou from './components/CreateThankYou';
import EntryShow from './components/EntryShow';
import GuestView from './components/GuestView';
import HowTo from './components/HowTo';
import Instructions from './components/Instructions';
import Main from './components/Main';
import NewRequest from './components/NewRequest';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import Request from './components/Request';
import Requests from './components/Requests';
import RequestShow from './components/RequestShow';
import ThankYouCamera from './components/ThankYouCamera';

const ROUTES = {
  anonHistory: AnonHistory,
  camera: Camera,
  createThankYou: CreateThankYou,
  entryShow: EntryShow,
  guestView: GuestView,
  howTo: HowTo,
  instructions: Instructions,
  main: Main,
  newRequest: NewRequest,
  notifications: Notifications,
  profile: Profile,
  request: Request,
  requests: Requests,
  requestShow: RequestShow,
  thankYouCamera: ThankYouCamera,
};

export default class inknead extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeDonation: null,
      anonEmail: null,
      anonHistory: null,
      anonID: null,
      currentEmail: null,
      entry: null,
      guestDonation: false,
      newRequestErrorMessage: null,
      requests: null,
      request: null,
      totalDonatedPizzas: 0,
      url: null,
      user: null,
      userHistory: null,
      videoData: null,
      thankYouData: null,
    }
    this.selectAnon = this.selectAnon.bind(this);
    this.collectAnonHistory = this.collectAnonHistory.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.collectRequests = this.collectRequests.bind(this);
    this.collectRequest = this.collectRequest.bind(this);
    this.collectEntry = this.collectEntry.bind(this);
    this.collectUserHistory = this.collectUserHistory.bind(this);
    this.sumDonatedPizzas = this.sumDonatedPizzas.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.handleGuestDonation = this.handleGuestDonation.bind(this);
    this.handleWelcomeUrl = this.handleWelcomeUrl.bind(this);
    this.handleActiveDonation = this.handleActiveDonation.bind(this);
    this.collectAnonEmail = this.collectAnonEmail.bind(this);
    this.handleThankYouData = this.handleThankYouData.bind(this);
    this.handleVideoData = this.handleVideoData.bind(this);
    this.handleNewRequestErrorMessage = this.handleNewRequestErrorMessage.bind(this);
  }
  createSession(userInfo) {
    fetch('https://in-knead.herokuapp.com/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({userInfo})
    })
    .then((response) => {
      return response.json()})
    .then((responseJson) => {
      this.onUserChange(responseJson.user)
      this.onEmailChange(responseJson.email)
      this.handleActiveDonation(responseJson.activeDonation)
      this.collectAnonEmail(responseJson.anonEmail)
    })
    .catch((error) => {
      console.error(error);
    });
  }
  componentDidMount() {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        if (data) {
          const accessToken = data.accessToken
          const responseInfoCallback = (error, result) => {
            if (error) {
              alert('Error fetching data: ' + error.toString());
            } else {
              this.createSession(result)
            }
          }
          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken,
              parameters: {
                fields: {
                  string: 'email,name,first_name,middle_name,last_name'
                }
              }
            },
            responseInfoCallback
          );
          new GraphRequestManager().addRequest(infoRequest).start()
        }
      }
    )
  }
  selectAnon(anonID) {
    this.setState({anonID})
  }
  collectAnonHistory(anonHistory) {
    this.setState({anonHistory})
  }
  onUserChange(user) {
    this.setState({user})
  }
  handleGuestDonation(guestDonation) {
    this.setState({guestDonation})
  }
  onEmailChange(currentEmail) {
    this.setState({currentEmail})
  }
  collectRequests(requests) {
    this.setState({requests})
  }
  collectRequest(request) {
    this.setState({request})
  }
  collectEntry(entry) {
    this.setState({entry})
  }
  collectUserHistory(userHistory) {
    this.setState({userHistory})
  }
  sumDonatedPizzas(totalDonatedPizzas) {
    this.setState({totalDonatedPizzas})
  }
  handleWelcomeUrl(url) {
    this.setState({url})
  }
  handleActiveDonation(activeDonation) {
    this.setState({activeDonation})
  }
  collectAnonEmail(anonEmail) {
    this.setState({anonEmail})
  }
  handleVideoData(videoData) {
    this.setState({videoData})
  }
  handleThankYouData(thankYouData) {
    this.setState({thankYouData})
  }
  handleNewRequestErrorMessage(newRequestErrorMessage) {
    this.setState({newRequestErrorMessage})
  }
  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} onUserChange={this.onUserChange} user={this.state.user} selectAnon={this.selectAnon} anonID={this.state.anonID} anonHistory={this.state.anonHistory} collectAnonHistory={this.collectAnonHistory} entry={this.state.entry} collectEntry={this.collectEntry} handleGuestDonation={this.handleGuestDonation} guestDonation={this.state.guestDonation} onEmailChange={this.onEmailChange} currentEmail={this.state.currentEmail} collectRequests={this.collectRequests} requests={this.state.requests} collectRequest={this.collectRequest} request={this.state.request} collectUserHistory={this.collectUserHistory} userHistory={this.state.userHistory} sumDonatedPizzas={this.sumDonatedPizzas} totalDonatedPizzas={this.state.totalDonatedPizzas} url={this.state.url} handleWelcomeUrl={this.handleWelcomeUrl} collectActiveDonation={this.handleActiveDonation} activeDonation={this.state.activeDonation} collectAnonEmail={this.collectAnonEmail} anonEmail={this.state.anonEmail} videoData={this.state.videoData} onChangeVideoData={this.handleVideoData} thankYouData={this.state.thankYouData} onChangeThankYouData={this.handleThankYouData} newRequestErrorMessage={this.state.newRequestErrorMessage} onChangeNewRequestErrorMesssage={this.handleNewRequestErrorMessage} />;
  }
  render() {
    const sceneConfig = (renderScene) => {
      return Navigator.SceneConfigs.FloatFromRight
      // if (renderScene.name === 'profile') {
      //   return Navigator.SceneConfigs.FloatFromLeft
      // } else if (renderScene.name === 'newRequest'){
      // } else if (renderScene.name === 'instructions') {
      //   return Navigator.SceneConfigs.VerticalUpSwipeJump
      // } else {
      //   return Navigator.SceneConfigs.FloatFromRight
      // }
    }
    return (
      <Navigator
      initialRoute={{name: 'main'}}
      renderScene={this.renderScene}
      configureScene={sceneConfig}
      />
    );
  }
};
