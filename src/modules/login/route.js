import { createStackNavigator } from 'react-navigation';
import {
  LoginScreen
} from './view';

export const LoginScreensNavigation = createStackNavigator(
  {
    login: LoginScreen
  },
  {
    headerMode: 'none'
  }
);
