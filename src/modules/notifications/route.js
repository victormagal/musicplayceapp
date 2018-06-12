import { createStackNavigator } from 'react-navigation';
import { NotificationScreen } from './view';

export const NotificationScreensNavigation = createStackNavigator(
  {
    notificationScreen: {
      screen: NotificationScreen,
      navigationOptions: {
        header: null
      }
    },
  }
);