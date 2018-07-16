import { createStackNavigator } from 'react-navigation';
import {PlayerScreensNavigation} from '../player'
import { FeedScreen } from './view';

export const FeedScreensNavigation = createStackNavigator(
  {
    FeedScreen: FeedScreen,
    player: PlayerScreensNavigation

},{
    headerMode: 'none'
  }
);
