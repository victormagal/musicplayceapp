import React from 'react';
import { NetInfo } from 'react-native';
import {
    applyMiddleware,
    createStore
} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {
    LoginScreens,
    ProfileScreensNavigation,
    IndicateSongScreensNavigation,
    FeedScreensNavigation,
    NotificationScreensNavigation,
    StartScreen,
    MessageScreen
} from './src/modules';
import { reducers } from './src/state/reducer';
import { loadFont, updateNetwork } from './src/state/action';
import { MPTabBottomComponent } from './src/components';
import { MPTabConfigurationIcon, MPTabNotificationIcon, MPTabProfileIcon } from './src/assets/svg/custom';

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
