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
import {MPHelp} from "../../components/settings";

export const SettingsNavigation = createStackNavigator(
  {
    homeSettings: InitialSettingsScreen,
    editSettings: EditSettingsScreen,
    notificationsSettings: NotificationSettingsScreen,
    inviteSettings: InviteSettingsScreen,
    helpSettings: HelpSettingsScreen,
    sendHelp: MPHelp,
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
