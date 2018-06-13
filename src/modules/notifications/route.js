import { createStackNavigator } from 'react-navigation';
import { NotificationScreen, ChatScreen } from './view';

export const NotificationScreensNavigation = createStackNavigator(
  {
    notificationScreen: NotificationScreen,
    chatScreen: ChatScreen
  },
  {
    initialRouteName: 'chatScreen',
    headerMode: 'none'
  }
);