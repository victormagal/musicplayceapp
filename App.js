import 'babel-polyfill';
import React from 'react';
import { NetInfo, AppRegistry } from 'react-native';
import fetch from 'cross-fetch';
import { 
  applyMiddleware, 
  createStore
} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import { Font } from 'expo';
import { 
  LoginScreensNavigation,
  ProfileScreensNavigation,
  IndicateSongScreensNavigation,
  FeedScreensNavigation,
  NotificationScreensNavigation,
  SongsScreensNavigation,
  StartScreen,
  MessageScreen
} from './src/modules';
import { reducers } from './src/state/reducer';
import { loadFont, updateNetwork } from './src/state/action';
import { MPTabBottomComponent } from './src/components';
import { MPTabConfigurationIcon, MPTabNotificationIcon, MPTabProfileIcon } from './src/assets/svg/custom';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if(typeof global.self === "undefined")
{
  global.self = global;
}

global.fetch = fetch;

const HomeTabBottomNavigation = createBottomTabNavigator({
  feed: {
    screen: FeedScreensNavigation,
    navigationOptions: {
      tabBarIcon: MPTabConfigurationIcon
    }
  },
  notification: {
    screen: NotificationScreensNavigation,
    navigationOptions: {
      tabBarIcon: MPTabNotificationIcon
    }
  },
  profile: {
    screen: ProfileScreensNavigation,
    navigationOptions: {
      tabBarIcon: MPTabProfileIcon
    }
  }
}, {
  initialRouteName: 'feed',
  tabBarComponent: MPTabBottomComponent
});

const StartNavigation = createStackNavigator(
  {
    start: StartScreen,
    login: LoginScreensNavigation,
    home: HomeTabBottomNavigation,
    message: MessageScreen,
    indicateSong: IndicateSongScreensNavigation,
    registerSong: SongsScreensNavigation
  },
  {
    initialRouteName: 'start',
    headerMode: 'none'
  }
);

export default class App extends React.Component {

  componentWillMount() {
    Font.loadAsync({
      'montSerrat': require('./assets/fonts/Montserrat-Regular.ttf'),
      'montSerratLight': require('./assets/fonts/Montserrat-Light.ttf'),
      'montSerratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'montSerratMedium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'montSerratSemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'montSerratBoldItalic': require('./assets/fonts/Montserrat-BoldItalic.ttf'),
      'montSerratItalic': require('./assets/fonts/Montserrat-Italic.ttf'),
      'probaProRegular': require('./assets/fonts/ProbaPro-Regular.otf'),
    }).then(() => {
      store.dispatch(loadFont(true));
    });
  }

  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillUnmount(){
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    store.dispatch(updateNetwork(isConnected));
  };

  render() {
    return (
      <Provider store={store}>
        <StartNavigation />
      </Provider>
    );
  }
}
