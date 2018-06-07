import { createStackNavigator } from 'react-navigation';
import { MessageScreen } from './view';

export const MessageNavigation = createStackNavigator(
  {
    message: MessageScreen
  },
  {
    headerMode: 'none'
  }
);