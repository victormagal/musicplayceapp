import { createStackNavigator } from 'react-navigation';
import { ConfigurationScreen } from './view/ConfigurationScreen';
import { EditConfigurationScreen } from './view/EditConfigurationScreen';
import { InviteConfigurationScreen } from './view/InviteConfiguration';

export const ConfigurationScreensNavigation = createStackNavigator(
  {
    configuration: {
      // screen: InviteConfigurationScreen,
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
    },
    inviteConfiguration: {
      screen: InviteConfigurationScreen,
      navigationOptions: {
        header: null
      }
    }
  }
);