import React from 'react';
import fetch from 'cross-fetch';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createStackNavigator } from 'react-navigation';
import { Font, DangerZone } from 'expo';
import { ProfileScreen } from './src/profile';
import { HomeScreen } from './src/home';
import { AddArtistScreen } from './src/registerSongs';
import { ConfigurationScreen } from './src/configuration';
import { reducers } from './src/state/reducer';
import { changeLanguage, loadFont } from './src/state/action';

const { Localization } = DangerZone;
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if(typeof global.self === "undefined")
{
    global.self = global;
}

let state = {
    fontLoaded: false,
};

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
            screen: AddArtistScreen,
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
//      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),

    async componentWillMount(){
        await Font.loadAsync({
            'montSerrat': require('./assets/fonts/Montserrat-Regular.ttf'),
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
