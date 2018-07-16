import { createStackNavigator } from 'react-navigation';
import {
  ProfileScreen, ArtistProfileScreen, EditProfileDescriptionScreen, EditFolderScreen
} from './view';
import {SettingsNavigation} from '../settings'

export const ProfileScreensNavigation = createStackNavigator(
  {
    ProfileScreen: ProfileScreen,
    ArtistProfileScreen: ArtistProfileScreen,
    EditProfileDescription: EditProfileDescriptionScreen,
    EditFolder: EditFolderScreen,
    settings: SettingsNavigation
  },
  {
    initialRouteName: 'ProfileScreen',
    headerMode: 'none'
  }
);
