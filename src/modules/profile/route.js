import { createStackNavigator } from 'react-navigation';
import {
  MyProfileScreen,
  UserProfileScreen,
  EditProfileDescriptionScreen,
  EditFolderScreen,
  EditProfileSitesScreen,
  EditProfileLocationScreen,
} from './view';
import {PlayerScreen, PlayerSaveSongScreen} from '../player/view'
import { SettingsNavigation, } from '../settings';
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
    ...SongsScreens,
    player: PlayerScreen,
    playerSaveSong: PlayerSaveSongScreen
  },
  {
    initialRouteName: 'MyProfileScreen',
    headerMode: 'none'
  }
);
