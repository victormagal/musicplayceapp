import 'babel-polyfill';
import React from 'react';
import fetch from 'cross-fetch';
import { 
  applyMiddleware, 
  createStore
} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createStackNavigator } from 'react-navigation';
import { Font } from 'expo';
import { 
  HomeScreen, 
  LoginScreensNavigation, 
  MessageNavigation, 
  ProfileScreen, 
  SongsScreensNavigation, 
  SettingsNavigation 
} from './src/modules';
import { reducers } from './src/state/reducer';
import { loadFont } from './src/state/action';
import { IndicateSongScreensNavigation } from './src/indicateSong';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if(typeof global.self === "undefined")
{
  global.self = global;
}

global.fetch = fetch;

const HomeNavigation = createStackNavigator(
  {
    login: LoginScreensNavigation,
    home: HomeScreen,
    profile: ProfileScreen,
    registerSongs: SongsScreensNavigation,
    settings: SettingsNavigation,
    indicateSong: IndicateSongScreensNavigation,
    message: MessageNavigation
  },
  {
    initialRouteName: 'settings',
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
    }).then(() => {
      store.dispatch(loadFont(true))
    });
  }

  render() {
    return (
      <Provider store={store}>
        <HomeNavigation />
      </Provider>
    );
  }
}