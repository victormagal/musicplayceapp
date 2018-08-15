import { createStackNavigator } from 'react-navigation';
import { IndicateSongFullScreen,
        IndicateSongFeedbackScreen} from './view';

export const IndicateSongScreensNavigation = createStackNavigator(
  {
    IndicateSongFullScreen: {
      screen: IndicateSongFullScreen,
      navigationOptions: {
        header: null
      }
    },
    IndicateSongFeedbackScreen: {
        screen: IndicateSongFeedbackScreen,
        navigationOptions: {
          header: null
        }
      }
  }
);
