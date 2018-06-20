import { createStackNavigator } from 'react-navigation';
import { ProfileScreen,
        ProfileEmptyScreen,
        ProfileNewScreen,
        DeleteSongScreen,
        DeleteSongSuccessScreen,
        EditDescriptionScreen,
        EditFolderScreen,
        ReportProfileScreen,
        ReportProfileSuccessScreen,
        UnfollowConfirmScreen,
        UnpublishSongScreen,
        UnpublishSongSuccessScreen } from './view';

export const ProfileScreensNavigation = createStackNavigator(
  {
    ProfileScreen: ProfileNewScreen,
    DeleteSongScreen: DeleteSongScreen,
    DeleteSongSuccessScreen: DeleteSongSuccessScreen,
    EditDescriptionScreen: EditDescriptionScreen,
    EditFolderScreen: EditFolderScreen,
    ReportProfileScreen: ReportProfileScreen,
    ReportProfileSuccessScreen: ReportProfileSuccessScreen,
    UnfollowConfirmScreen: UnfollowConfirmScreen,
    UnpublishSongScreen: UnpublishSongScreen,
    UnpublishSongSuccessScreen: UnpublishSongSuccessScreen,
  },
  {
    initialRouteName: 'ProfileScreen',
    headerMode: 'none'
  }
);