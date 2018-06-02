import { createStackNavigator } from 'react-navigation';
import { ConfigurationScreen, EditConfigurationScreen, InviteConfigurationScreen, ChangePasswordConfigurationScreen, FeedbackConfigurationScreen, NotificationConfigurationScreen, TermsConfigurationScreen, HelpConfigurationScreen } from './view';

export const ConfigurationScreensNavigation = createStackNavigator(
  {
    configuration: {
      // screen: HelpConfigurationScreen,
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
    },
    termsConfiguration: {
      screen: TermsConfigurationScreen,
      navigationOptions: {
        header: null
      }
    },
    helpConfiguration: {
      screen: HelpConfigurationScreen,
      navigationOptions: {
        header: null
      }
    }
  }
);
