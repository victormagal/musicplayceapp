import { createStackNavigator } from 'react-navigation';
import {
  InitialSettingsScreen,
  EditSettingsScreen,
  InviteSettingsScreen,
  ChangePasswordConfigurationScreen,
  FeedbackSettingsScreen,
  NotificationSettingsScreen,
  TermsSettingsScreen,
  HelpConfigurationScreen
} from './view';

export const SettingsNavigation = createStackNavigator(
  {
    homeSettings: InitialSettingsScreen,
    editSettings: EditSettingsScreen,
    inviteSettings: InviteSettingsScreen,
    passwordSettings: ChangePasswordConfigurationScreen,
    feedbackSettings: FeedbackSettingsScreen,
    notificationsSettings: NotificationSettingsScreen,
    termsSettings: TermsSettingsScreen,
    helpSettings: HelpConfigurationScreen
  },
  {
    initialRouteName: 'homeSettings',
    headerMode: 'none'
  }
);