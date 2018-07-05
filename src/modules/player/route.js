import { createStackNavigator } from 'react-navigation';
import {
  PlayerScreen, PlayerSaveSongScreen
} from './view';


export const PlayerScreensNavigation = createStackNavigator(
  {
    player: PlayerScreen,
    playerSaveSong: PlayerSaveSongScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
