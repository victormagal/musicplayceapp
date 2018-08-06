import { createStackNavigator } from 'react-navigation';
import {PlayerScreensNavigation} from '../player'
import { FeedScreen } from './view';
import {UserProfileScreen} from "../profile/view";

export const FeedScreensNavigation = createStackNavigator(
  {
    FeedScreen: FeedScreen,
    player: PlayerScreensNavigation,
    userProfile: UserProfileScreen
},{
    headerMode: 'none'
  }
);
