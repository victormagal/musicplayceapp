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
    InterpreterScreen,
    SaveDraftScreen, 
    StylesScreen,
    TitleScreen,
    UploadMediaEmptyScreen,
    UploadMediaFilledScreen } from './view';

export const SongsScreensNavigation = createStackNavigator(
  {
    UploadMediaEmptyScreen: UploadMediaEmptyScreen,
    UploadMediaFilledScreen: UploadMediaFilledScreen,
    TitleScreen:TitleScreen,
    MusicLetterScreen: MusicLetterScreen,
    MusicDescriptionScreen: MusicDescriptionScreen,
    StylesScreen: StylesScreen,
    ArtistsScreen: ArtistsScreen,
    InterpreterScreen: InterpreterScreen,
    AddArtistByEmailScreen: AddArtistByEmailScreen,
    AddArtistFullScreen: AddArtistFullScreen,
    AddArtistScreen: AddArtistScreen,
    ListArtistsScreen: ListArtistsScreen,
    FolderScreen: FolderScreen,
    ConfirmationScreen: ConfirmationScreen,
    SaveDraftScreen: SaveDraftScreen
  }, {
    initialRouteName: 'UploadMediaEmptyScreen',
    headerMode: 'none'
  }
);
