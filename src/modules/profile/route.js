import { createStackNavigator } from 'react-navigation';
import { ProfileScreen,
        ProfileEmptyScreen,
        ProfileNewScreen,
        ProfileFreemiumScreen,
        ManagerProfileScreen,
        ArtistProfileScreen,
        ComposerProfileScreen,
        EditProfileDescriptionScreen} from './view';

export const ProfileScreensNavigation = createStackNavigator(
  {
    ProfileScreen: ManagerProfileScreen,
    EditProfileDescription: EditProfileDescriptionScreen,
  },
  {
    initialRouteName: 'ProfileScreen',
    headerMode: 'none'
  }
);
