import { createStackNavigator } from 'react-navigation';
import {
  InitialSettingsScreen,
  EditSettingsScreen,
  NotificationSettingsScreen,
  InviteSettingsScreen,
  HelpSettingsScreen,
  PasswordSettingsScreen,
  FeedbackSettingsScreen,
  TermsSettingsScreen,
} from './view';

export const SettingsNavigation = createStackNavigator(
  {
    homeSettings: InitialSettingsScreen,
    editSettings: EditSettingsScreen,
    inviteSettings: InviteSettingsScreen,
    passwordSettings: PasswordSettingsScreen,
    feedbackSettings: FeedbackSettingsScreen,
    notificationsSettings: NotificationSettingsScreen,
    termsSettings: TermsSettingsScreen,
    helpSettings: HelpSettingsScreen
  },
  {
    initialRouteName: 'homeSettings',
    headerMode: 'none'
  }
);