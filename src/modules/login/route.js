import { createStackNavigator } from 'react-navigation';
import {
  LoginScreen,
  RegisterScreen,
  RegisterSuccessScreen
} from './view';

export const LoginScreensNavigation = createStackNavigator(
  {
    login: LoginScreen,
    register: RegisterScreen,
    registerSuccess: RegisterSuccessScreen
  },
  {
    headerMode: 'none'
  }
);
