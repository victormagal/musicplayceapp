import 'babel-polyfill';
import React from 'react';
import fetch from 'cross-fetch';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createStackNavigator } from 'react-navigation';
import { Font, DangerZone } from 'expo';
import { HomeScreen, ProfileScreen, SongsScreensNavigation, SettingsNavigation, LoginScreensNavigation, MessageNavigation, IndicateSongScreensNavigation, FeedScreensNavigation } from './src/modules';
import { reducers } from './src/state/reducer';
import { changeLanguage, loadFont } from './src/state/action';


const {Localization} = DangerZone;
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
    message: MessageNavigation,
    feed: FeedScreensNavigation,
  },
  {
    initialRouteName: 'feed',
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
