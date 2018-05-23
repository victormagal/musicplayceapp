import { createStackNavigator } from 'react-navigation';
import { ConfigurationScreen } from './view/ConfigurationScreen';
import { EditConfigurationScreen } from './view/EditConfigurationScreen';

export const ConfigurationScreensNavigation = createStackNavigator(
  {
    configuration: {
      screen: ConfigurationScreen,
      navigationOptions: {
        header: null
      }
    },
    editConfiguration: {
      screen: EditConfigurationScreen,
      navigationOptions: {
        header: null
      }
    }
  }
);