import React from 'react';
import fetch from 'cross-fetch';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createStackNavigator } from 'react-navigation';
import { DangerZone } from 'expo';
import { ProfileScreen } from './src/profile';
import { HomeScreen } from './src/home';
import { RegisterArtistsScreen, SaveDraftScreen, StylesScreen } from './src/registerSongs';
import { ConfigurationScreen } from './src/configuration';
import { reducers } from './src/state/reducer';
import { changeLanguage } from './src/state/action';

const { Localization } = DangerZone;
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if(typeof global.self === "undefined")
{
    global.self = global;
}

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
        configuration: {
            screen: ConfigurationScreen,
            navigationOptions: {
                header: null
            }
        },
        registerSongs: {
            screen: StylesScreen,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'registerSongs'
    }
);

export default class App extends React.Component {

    async componentDidMount(){
        const currentLocale = await Localization.getCurrentLocaleAsync();
        store.dispatch(changeLanguage(currentLocale));
    }

    render() {
        return (
            <Provider store={store}>
                <HomeNavigation />
            </Provider>
        );
    }
}
