import React from 'react';
import fetch from 'cross-fetch';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createStackNavigator } from 'react-navigation';
import { Font, DangerZone } from 'expo';
import { ProfileScreen } from './src/profile';
import { HomeScreen } from './src/home';
import { StylesScreen, SaveDraftScreen } from './src/registerSongs';
import { ConfigurationScreensNavigation } from './src/configuration';
import { SongsScreensNavigation } from './src/registerSongs';
import { reducers } from './src/state/reducer';
import { changeLanguage, loadFont } from './src/state/action';

const { Localization } = DangerZone;
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if(typeof global.self === "undefined")
{
    global.self = global;
}

global.fetch = fetch;

const HomeNavigation = createStackNavigator(
    {
        home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null
            }
        },
        profile: {
            screen: ProfileScreen,
            navigationOptions: {
                header: null
            }
        },
        registerSongs: {
            screen: SongsScreensNavigation,
            navigationOptions: {
                header: null
            }
        },
        configuration: {
            screen: ConfigurationScreensNavigation,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'configuration'
    }
);

export default class App extends React.Component {

    async componentWillMount(){
        await Font.loadAsync({
            'montSerrat': require('./assets/fonts/Montserrat-Regular.ttf'),
            'montSerratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
            'montSerratMedium': require('./assets/fonts/Montserrat-Medium.ttf'),
            'montSerratSemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
            'montSerratBoldItalic': require('./assets/fonts/Montserrat-BoldItalic.ttf'),
            'montSerratItalic': require('./assets/fonts/Montserrat-Italic.ttf'),
        });
        store.dispatch(loadFont(true))
    }

    render() {
        return (
            <Provider store={store}>
                <HomeNavigation />
            </Provider>
        );
    }
}
