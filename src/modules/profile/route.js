import { createStackNavigator } from 'react-navigation';
import {
  MyProfileScreen,
  UserProfileScreen,
  EditProfileDescriptionScreen,
  EditFolderScreen,
  EditProfileSitesScreen,
  EditProfileLocationScreen
} from './view';
import { SettingsNavigation } from '../settings';
import { SongsScreens } from '../registerSongs';

export const ProfileScreensNavigation = createStackNavigator(
  {
    MyProfileScreen: MyProfileScreen,
    UserProfileScreen: UserProfileScreen,
    EditProfileSites: EditProfileSitesScreen,
    EditProfileDescription: EditProfileDescriptionScreen,
    EditProfileLocation: EditProfileLocationScreen,
    EditFolder: EditFolderScreen,
    settings: SettingsNavigation,
    ...SongsScreens
  },
  {
    initialRouteName: 'MyProfileScreen',
    headerMode: 'none'
  }
);
