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
    ProfileScreen: ManagerProfileScreen,
    EditProfileDescription: EditProfileDescriptionScreen,
    EditFolder: EditFolderScreen,
  },
  {
    initialRouteName: 'ProfileScreen',
    headerMode: 'none'
  }
);
