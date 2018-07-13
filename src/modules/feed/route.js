import { createStackNavigator } from 'react-navigation';
import { FeedScreen } from './view';

export const FeedScreensNavigation = createStackNavigator(
  {
    FeedScreen: FeedScreen
  },{
    headerMode: 'none'
  }
);
