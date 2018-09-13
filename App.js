import React from 'react';
import {NetInfo, NativeModules, NativeEventEmitter, View, Platform} from 'react-native';
import {
  applyMiddleware,
  createStore
} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import MusicControl from 'react-native-music-control';
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
import {
  loadFont, updateNetwork, playerSongPause,
  playerSongUpdateProgress, songResume, songPause, songStop, playerSongStop
} from './src/state/action';
import {PlayerService} from './src/service';
import {MPTabBottomComponent, MPNetworkNotification} from './src/components';
import {applyAxiosInterceptops} from './src/connectors';
import {MPTabConfigurationIcon, MPTabNotificationIcon, MPTabProfileIcon} from './src/assets/svg/custom';

const { RNMusicPlayer } = NativeModules;
const RNMusicPlayerEmitter = new NativeEventEmitter(RNMusicPlayer);

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if (__DEV__) {
  NativeModules.DevSettings.setIsDebuggingRemotely(true)
}

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
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentDidMount() {
    this.playerPauseListener = RNMusicPlayerEmitter.addListener('playerDidPause', this.handleSongPauseListener);
    this.playerUpdateListener = RNMusicPlayerEmitter.addListener('playerDidUpdateWithProgress', this.handleSongUpdateListener);


    MusicControl.on('play', ()=> {
      store.dispatch(songResume());
    });

    MusicControl.on('pause', () => {
      store.dispatch(songPause());
    });

    MusicControl.on('stop', () => {
      store.dispatch(songStop());
    });

    MusicControl.enableBackgroundMode(true);
    applyAxiosInterceptops(store);
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
    let currentPlayerState = state["state"];

    if (RNMusicPlayer.statePlaying == currentPlayerState) {
      store.dispatch(playerSongUpdateProgress(state["progress"]));
    }else if(RNMusicPlayer.stateStopped === currentPlayerState){
      if(store.getState().playerReducer.player.isPlaying){
        store.dispatch(playerSongStop());
        PlayerService.stopNotification();
      }
    }
  };

  handleConnectionChange = (isConnected) => {
    store.dispatch(updateNetwork(isConnected));
  };

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StartNavigation />
          <MPNetworkNotification />
        </View>
      </Provider>
    );
  }
}
