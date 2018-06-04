import { createStackNavigator } from 'react-navigation';
import { AddArtistByEmailScreen,
    AddArtistFullScreen,
    AddArtistScreen,
    ArtistsScreen,
    ConfirmationScreen,
    FolderScreen,
    ISRCScreen,
    ListArtistsScreen,
    MusicDescriptionScreen,
    MusicLetterScreen, 
    RegisterArtistsScreen,
    SaveDraftScreen, 
    StylesScreen,
    TitleScreen,
    UploadMediaEmptyScreen,
    UploadMediaFilledScreen } from './view';

export const SongsScreensNavigation = createStackNavigator(
  {
    UploadMediaEmptyScreen: {
      // screen: TermsConfigurationScreen,
      screen: ISRCScreen,
      navigationOptions: {
        header: null
      }
    },
    UploadMediaFilledScreen: {
      screen: UploadMediaFilledScreen,
      navigationOptions: {
        header: null
      }
    },
    TitleScreen: {
      screen: TitleScreen,
      navigationOptions: {
        header: null
      }
    },
    MusicLetterScreen: {
      screen: MusicLetterScreen,
      navigationOptions: {
        header: null
      }
    },
    MusicDescriptionScreen: {
      screen: MusicDescriptionScreen,
      navigationOptions: {
        header: null
      }
    },
    StylesScreen: {
      screen: StylesScreen,
      navigationOptions: {
        header: null
      }
    },
    ArtistsScreen: {
      screen: ArtistsScreen,
      navigationOptions: {
        header: null
      }
    },
    RegisterArtistsScreen: {
      screen: RegisterArtistsScreen,
      navigationOptions: {
        header: null
      }
    },
    AddArtistByEmailScreen: {
      screen: AddArtistByEmailScreen,
      navigationOptions: {
        header: null
      }
    },
    AddArtistFullScreen: {
      screen: AddArtistFullScreen,
      navigationOptions: {
        header: null
      }
    },
    AddArtistScreen: {
      screen: AddArtistScreen,
      navigationOptions: {
        header: null
      }
    },
    ListArtistsScreen: {
      screen: ListArtistsScreen,
      navigationOptions: {
        header: null
      }
    },
    FolderScreen: {
      screen: FolderScreen,
      navigationOptions: {
        header: null
      }
    },
    ConfirmationScreen: {
      screen: ConfirmationScreen,
      navigationOptions: {
        header: null
      }
    }
    
  }
);
