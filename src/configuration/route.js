import { createStackNavigator } from 'react-navigation';
import { ConfigurationScreen, EditConfigurationScreen, InviteConfigurationScreen, ChangePasswordConfigurationScreen, FeedbackConfigurationScreen } from './view';
import { NotificationConfigurationScreen } from './view/NotificationConfigurationScreen';

export const ConfigurationScreensNavigation = createStackNavigator(
  {
    configuration: {
      screen: NotificationConfigurationScreen,
      // screen: ConfigurationScreen,
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
    },
    feedbackConfiguration: {
      screen: FeedbackConfigurationScreen,
      navigationOptions: {
        header: null
      }
    },
    notificationConfiguration: {
      screen: NotificationConfigurationScreen,
      navigationOptions: {
        header: null
      }
    }
  }
);