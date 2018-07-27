import React from 'react';
import {NetInfo, NativeModules, NativeEventEmitter} from 'react-native';
import {
  applyMiddleware,
  createStore
} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {
  LoginScreens,
  ProfileScreensNavigation,
  IndicateSongScreensNavigation,
  FeedScreensNavigation,
  NotificationScreensNavigation,
  StartScreen,
  MessageScreen
} from './src/modules';
import {reducers} from './src/state/reducer';
import {loadFont, updateNetwork, playerSongPause, playerSongUpdateProgress} from './src/state/action';
import {MPTabBottomComponent} from './src/components';
import {MPTabConfigurationIcon, MPTabNotificationIcon, MPTabProfileIcon} from './src/assets/svg/custom';

const { RNMusicPlayer } = NativeModules;
const RNMusicPlayerEmitter = new NativeEventEmitter(RNMusicPlayer);

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

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
    ...LoginScreens,
    home: HomeTabBottomNavigation,
    message: MessageScreen,
    indicateSong: IndicateSongScreensNavigation
  },
  {
    initialRouteName: 'start',
    headerMode: 'none'
  }
);

export default class App extends React.Component {

  componentWillMount() {
    store.dispatch(loadFont(true));
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    this.playerPauseListener = RNMusicPlayerEmitter.addListener('playerDidPause', this.handleSongPauseListener);
    this.playerUpdateListener = RNMusicPlayerEmitter.addListener('playerDidUpdateWithProgress', this.handleSongUpdateListener);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    this.playerPauseListener.remove();
    this.playerUpdateListener.remove();
  }

  handleSongPauseListener = () => {
    store.dispatch(playerSongPause());
  };

  handleSongUpdateListener = (state) => {
    let currentPlayerState = state["state"]

    if (RNMusicPlayer.statePlaying == currentPlayerState) {
      store.dispatch(playerSongUpdateProgress(state["progress"]));
    }
  };

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
