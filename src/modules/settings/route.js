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
    notificationsSettings: NotificationSettingsScreen,
    inviteSettings: InviteSettingsScreen,
    helpSettings: HelpSettingsScreen,
    passwordSettings: PasswordSettingsScreen,
    feedbackSettings: FeedbackSettingsScreen,
    termsSettings: TermsSettingsScreen
  },
  {
    initialRouteName: 'homeSettings',
    headerMode: 'none'
  }
);