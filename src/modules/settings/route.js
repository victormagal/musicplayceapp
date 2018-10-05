import { createStackNavigator } from 'react-navigation';
import {
  InitialSettingsScreen,
  EditSettingsScreen,
  NotificationSettingsScreen,
  HelpSettingsScreen,
  PasswordSettingsScreen,
  FeedbackSettingsScreen,
  TermsSettingsScreen,
  PaymentTypesScreen,
  AddChangePlanScreen
} from './view';
import {MPHelp, MPHelpSuccess} from "../../components/settings";

export const SettingsNavigation = createStackNavigator(
  {
    homeSettings: InitialSettingsScreen,
    editSettings: EditSettingsScreen,
    notificationsSettings: NotificationSettingsScreen,
    helpSettings: HelpSettingsScreen,
    sendHelp: MPHelp,
    helpSuccess: MPHelpSuccess,
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
