import 'babel-polyfill';
import React from 'react';
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
  HomeScreen, 
  LoginScreensNavigation, 
  MessageNavigation, 
  ProfileScreensNavigation,
  SettingsNavigation,
  IndicateSongScreensNavigation,
  FeedScreensNavigation,
  NotificationScreensNavigation,
  PlayerScreensNavigation
} from './src/modules';
import { reducers } from './src/state/reducer';
import { loadFont } from './src/state/action';
import { ConfirmationScreen } from './src/modules/registerSongs';
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

const HomeNavigation = createStackNavigator(
  {
    home: HomeScreen,
    profile: ProfileScreensNavigation,
    registerSongs: ConfirmationScreen,
    settings: SettingsNavigation,
    indicateSong: IndicateSongScreensNavigation,
    message: MessageNavigation,
    feed: FeedScreensNavigation,
    notification: NotificationScreensNavigation,
    player: PlayerScreensNavigation
  },
  {
    initialRouteName: 'player',
    headerMode: 'none'
  }
);

export default class App extends React.Component {

  componentWillMount() {
    Font.loadAsync({
      'montSerrat': require('./assets/fonts/Montserrat-Regular.ttf'),
      'montSerratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'montSerratMedium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'montSerratSemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'montSerratBoldItalic': require('./assets/fonts/Montserrat-BoldItalic.ttf'),
      'montSerratItalic': require('./assets/fonts/Montserrat-Italic.ttf'),
      'probaProRegular': require('./assets/fonts/ProbaPro-Regular.otf'),
    }).then(() => {
      store.dispatch(loadFont(true))
    });
  }

  render() {
    return (
      <Provider store={store}>
        <HomeTabBottomNavigation />
      </Provider>
    );
  }
}
