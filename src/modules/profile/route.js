import { createStackNavigator } from 'react-navigation';
import {
  ProfileScreen,
  ArtistProfileScreen,
  EditProfileDescriptionScreen,
  EditFolderScreen,
  EditProfileSitesScreen,
  EditProfileLocationScreen
} from './view';
import { SettingsNavigation } from '../settings';
import { SongsScreens } from '../registerSongs';

export const ProfileScreensNavigation = createStackNavigator(
  {
    ProfileScreen: ProfileScreen,
    ArtistProfileScreen: ArtistProfileScreen,
    EditProfileSites: EditProfileSitesScreen,
    EditProfileDescription: EditProfileDescriptionScreen,
    EditProfileLocation: EditProfileLocationScreen,
    EditFolder: EditFolderScreen,
    settings: SettingsNavigation,
    ...SongsScreens
  },
  {
    initialRouteName: 'ProfileScreen',
    headerMode: 'none'
  }
);
