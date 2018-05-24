import { createStackNavigator } from 'react-navigation';
import { ConfigurationScreen } from './view/ConfigurationScreen';
import { EditConfigurationScreen } from './view/EditConfigurationScreen';
import { InviteConfigurationScreen } from './view/InviteConfigurationScreen';
import { ChangePasswordConfigurationScreen } from './view/ChangePasswordConfigurationScreen';

export const ConfigurationScreensNavigation = createStackNavigator(
  {
    configuration: {
      // screen: ChangePasswordConfigurationScreen,
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
    },
    changePasswordConfiguration: {
      screen: ChangePasswordConfigurationScreen,
      navigationOptions: {
        header: null
      }
    }
  }
);