import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
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
import reducers from './reducers';
import Router from './Router';

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
    super(props);

    // this.state = {
    //   activeDonation: null,
    //   anonEmail: null,
    //   anonRequests: null,
    //   anonThankYous: null,
    //   anonID: null,
    //   createThankYouErrorMessage: null,
    //   signupEmail: null,
    //   currentEmail: null,
    //   entry: null,
    //   guestDonation: false,
    //   newRequestErrorMessage: null,
    //   recentSuccessfulRequest: null,
    //   recentThankYou: null,
    //   requests: null,
    //   request: null,
    //   thankYous: null,
    //   totalDonatedPizzas: 0,
    //   thankYouData: null,
    //   url: null,
    //   user: null,
    //   userRequests: null,
    //   userThankYous: null,
    //   videoData: null,
    // };
  //   // this.selectAnon = this.selectAnon.bind(this);
  //   this.collectAnonRequests = this.collectAnonRequests.bind(this);
  //   this.collectAnonThankYous = this.collectAnonThankYous.bind(this);
  //   this.onUserChange = this.onUserChange.bind(this);
  //   this.onSignupEmailChange = this.onSignupEmailChange.bind(this);
  //   this.onCurrentEmailChange = this.onCurrentEmailChange.bind(this);
  //   this.collectRequests = this.collectRequests.bind(this);
  //   this.collectRequest = this.collectRequest.bind(this);
  //   this.collectThankYous = this.collectThankYous.bind(this);
  //   this.collectEntry = this.collectEntry.bind(this);
  //   this.collectUserRequests = this.collectUserRequests.bind(this);
  //   this.collectUserThankYous = this.collectUserThankYous.bind(this);
  //   this.handleCreateThankYouErrorMessage = this.handleCreateThankYouErrorMessage.bind(this);
  //   this.sumDonatedPizzas = this.sumDonatedPizzas.bind(this);
  //   this.renderScene = this.renderScene.bind(this);
  //   this.handleGuestDonation = this.handleGuestDonation.bind(this);
  //   this.handleWelcomeUrl = this.handleWelcomeUrl.bind(this);
  //   this.handleActiveDonation = this.handleActiveDonation.bind(this);
  //   this.collectAnonEmail = this.collectAnonEmail.bind(this);
  //   this.handleThankYouData = this.handleThankYouData.bind(this);
  //   this.handleVideoData = this.handleVideoData.bind(this);
  //   this.handleNewRequestErrorMessage = this.handleNewRequestErrorMessage.bind(this);
  //   this.handleRecentSuccessfulRequest = this.handleRecentSuccessfulRequest.bind(this);
  //   this.handleRecentThankYou = this.handleRecentThankYou.bind(this);
  }

  // selectAnon(anonID) {
  //   this.setState({ anonID });
  // }
  // collectAnonRequests(anonRequests) {
  //   this.setState({ anonRequests });
  // }
  // collectAnonThankYous(anonThankYous) {
  //   this.setState({ anonThankYous });
  // }
  // onUserChange(user) {
  //   this.setState({ user });
  // }
  // handleGuestDonation(guestDonation) {
  //   this.setState({ guestDonation });
  // }
  // onCurrentEmailChange(currentEmail) {
  //   this.setState({ currentEmail });
  // }
  // onSignupEmailChange(signupEmail) {
  //   this.setState({ signupEmail });
  // }
  // collectRequests(requests) {
  //   this.setState({ requests });
  // }
  // collectThankYous(thankYous) {
  //   this.setState({ thankYous });
  // }
  // collectRequest(request) {
  //   this.setState({ request });
  // }
  // collectEntry(entry) {
  //   this.setState({ entry });
  // }
  // collectUserRequests(userRequests) {
  //   this.setState({ userRequests });
  // }
  // collectUserThankYous(userThankYous) {
  //   this.setState({ userThankYous });
  // }
  // sumDonatedPizzas(totalDonatedPizzas) {
  //   this.setState({ totalDonatedPizzas });
  // }
  // handleWelcomeUrl(url) {
  //   this.setState({ url });
  // }
  // handleActiveDonation(activeDonation) {
  //   this.setState({ activeDonation });
  // }
  // collectAnonEmail(anonEmail) {
  //   this.setState({ anonEmail });
  // }
  // handleVideoData(videoData) {
  //   this.setState({ videoData });
  // }
  // handleThankYouData(thankYouData) {
  //   this.setState({ thankYouData });
  // }
  // handleNewRequestErrorMessage(newRequestErrorMessage) {
  //   this.setState({ newRequestErrorMessage });
  // }
  // handleRecentSuccessfulRequest(recentSuccessfulRequest) {
  //   this.setState({ recentSuccessfulRequest });
  // }
  // handleCreateThankYouErrorMessage(createThankYouErrorMessage) {
  //   this.setState({ createThankYouErrorMessage });
  // }
  // handleRecentThankYou(recentThankYou) {
  //   this.setState({ recentThankYou });
  // }
  // renderScene(route, navigator) {
  //   const Scene = ROUTES[route.name];
  //   return (
  //     <Scene
  //       route={route}
  //       navigator={navigator}
  //       onUserChange={this.onUserChange}
  //       user={this.state.user}
  //       selectAnon={this.selectAnon}
  //       anonID={this.state.anonID}
  //       anonRequests={this.state.anonRequests}
  //       collectAnonRequests={this.collectAnonRequests}
  //       anonThankYous={this.state.anonThankYous}
  //       collectAnonThankYous={this.collectAnonThankYous}
  //       entry={this.state.entry}
  //       collectEntry={this.collectEntry}
  //       handleGuestDonation={this.handleGuestDonation}
  //       guestDonation={this.state.guestDonation}
  //       onCurrentEmailChange={this.onCurrentEmailChange}
  //       currentEmail={this.state.currentEmail}
  //       onSignupEmailChange={this.onSignupEmailChange}
  //       signupEmail={this.state.signupEmail}
  //       collectRequests={this.collectRequests}
  //       requests={this.state.requests}
  //       collectThankYous={this.collectThankYous}
  //       thankYous={this.state.thankYous}
  //       collectRequest={this.collectRequest}
  //       request={this.state.request}
  //       collectUserRequests={this.collectUserRequests}
  //       userRequests={this.state.userRequests}
  //       collectUserThankYous={this.collectUserThankYous}
  //       userThankYous={this.state.userThankYous}
  //       sumDonatedPizzas={this.sumDonatedPizzas}
  //       totalDonatedPizzas={this.state.totalDonatedPizzas}
  //       url={this.state.url}
  //       handleWelcomeUrl={this.handleWelcomeUrl}
  //       collectActiveDonation={this.handleActiveDonation}
  //       activeDonation={this.state.activeDonation}
  //       collectAnonEmail={this.collectAnonEmail}
  //       anonEmail={this.state.anonEmail}
  //       videoData={this.state.videoData}
  //       onChangeVideoData={this.handleVideoData}
  //       thankYouData={this.state.thankYouData}
  //       onChangeThankYouData={this.handleThankYouData}
  //       newRequestErrorMessage={this.state.newRequestErrorMessage}
  //       onChangeNewRequestErrorMesssage={this.handleNewRequestErrorMessage}
  //       recentSuccessfulRequest={this.state.recentSuccessfulRequest}
  //       handleRecentSuccessfulRequest={this.handleRecentSuccessfulRequest}
  //       createThankYouErrorMessage={this.state.createThankYouErrorMessage}
  //       handleCreateThankYouErrorMessage={this.handleCreateThankYouErrorMessage}
  //       recentThankYou={this.state.recentThankYou}
  //       handleRecentThankYou={this.handleRecentThankYou}
  //     />
  //   );
// }
  render() {
    const sceneConfig = () => Navigator.SceneConfigs.FloatFromRight
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
