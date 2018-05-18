import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createStackNavigator } from 'react-navigation';
import { DangerZone } from 'expo';
import { ProfileScreen } from './src/profile';
import { HomeScreen } from './src/home';
import { ConfigurationScreen } from './src/configuration';
import { reducers } from './src/state/reducer';
import { changeLanguage } from './src/state/action';

const { Localization } = DangerZone;
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

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
        }
    },
    {
        initialRouteName: 'profile'
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
