import { createStackNavigator } from 'react-navigation';
import { IndicateSongFullScreen,
        IndicateSongSearchScreen,
        IndicateSongNotFoundScreen,
        IndicateSongFeedbackScreen} from './view';

export const IndicateSongScreensNavigation = createStackNavigator(
  {
    IndicateSongFullScreen: {
      screen: IndicateSongFullScreen,
      navigationOptions: {
        header: null
      }
    },
    IndicateSongSearchScreen: {
        screen: IndicateSongSearchScreen,
        navigationOptions: {
          header: null
        }
    },
    IndicateSongNotFoundScreen: {
        screen: IndicateSongNotFoundScreen,
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
