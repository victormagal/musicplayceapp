import { createStackNavigator } from 'react-navigation';
import { ProfileScreen,
        ProfileEmptyScreen,
        ProfileNewScreen,
        ProfileFreemiumScreen,
        ManagerProfileScreen,
        ArtistProfileScreen,
        ComposerProfileScreen,
        EditProfileDescriptionScreen,
        EditFolderScreen} from './view';

export const ProfileScreensNavigation = createStackNavigator(
  {
    ProfileScreen: ComposerProfileScreen,
    ArtistProfileScreen: ArtistProfileScreen,
    EditProfileDescription: EditProfileDescriptionScreen,
    EditFolder: EditFolderScreen,
  },
  {
    initialRouteName: 'ProfileScreen',
    headerMode: 'none'
  }
);
