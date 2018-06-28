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
  PaymentTypesScreen,
  AddChangePlanScreen
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
    termsSettings: TermsSettingsScreen,
    paymentTypesSettings: PaymentTypesScreen,
    addChangePlanSettings: AddChangePlanScreen,
  },
  {
    initialRouteName: 'homeSettings',
    headerMode: 'none'
  }
);