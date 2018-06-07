import { createStackNavigator } from 'react-navigation';
import { FeedScreen } from './view';

export const FeedScreensNavigation = createStackNavigator(
  {
    FeedScreen: {
      screen: FeedScreen,
      navigationOptions: {
        header: null
      }
    },
  }
);