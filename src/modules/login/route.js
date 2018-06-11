import { createStackNavigator } from 'react-navigation';
import {
  LoginScreen,
  RegisterScreen
} from './view';

export const LoginScreensNavigation = createStackNavigator(
  {
    login: LoginScreen,
    register: RegisterScreen
  },
  {
    headerMode: 'none'
  }
);
