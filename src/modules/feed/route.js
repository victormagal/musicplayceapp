import { createStackNavigator } from 'react-navigation';
import {PlayerScreensNavigation} from '../player'
import { FeedScreen } from './view';
import {ArtistProfileScreen} from "../profile/view";

export const FeedScreensNavigation = createStackNavigator(
  {
    FeedScreen: FeedScreen,
    player: PlayerScreensNavigation,
    artistProfile: ArtistProfileScreen

},{
    headerMode: 'none'
  }
);
