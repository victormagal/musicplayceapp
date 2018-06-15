import { createStackNavigator } from 'react-navigation';
import { FeedScreen } from './view';
import {PlayerScreensNavigation} from '../player';

export const FeedScreensNavigation = createStackNavigator(
  {
    FeedScreen: FeedScreen,
    player: PlayerScreensNavigation
  },{
    headerMode: 'none'
  }
);
