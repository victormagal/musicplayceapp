import { createStackNavigator } from 'react-navigation';
import {
  PlayerScreen, PlayerSaveSongScreen, PlayerCommentSongScreen
} from './view';


export const PlayerScreensNavigation = createStackNavigator(
  {
    player: PlayerScreen,
    playerSaveSong: PlayerSaveSongScreen,
    playerCommentSong: PlayerCommentSongScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
