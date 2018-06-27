import { createStackNavigator } from 'react-navigation';
import {
  PlayerScreen
} from './view';


export const PlayerScreensNavigation = createStackNavigator(
  {
    player: PlayerScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
