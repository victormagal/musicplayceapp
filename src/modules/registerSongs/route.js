import { createStackNavigator } from 'react-navigation';
import {
    ArtistsScreen,
    ConfirmationScreen,
    FolderScreen,
    ISRCScreen,
    MusicDescriptionScreen,
    MusicLetterScreen, 
    InterpreterScreen,
    SaveDraftScreen, 
    StylesScreen,
    TitleScreen,
    RegisterSongScreen,
} from './view';

export const SongsScreensNavigation = createStackNavigator(
  {
    RegisterSongScreen: RegisterSongScreen,
    TitleScreen:TitleScreen,
    MusicLetterScreen: MusicLetterScreen,
    MusicDescriptionScreen: MusicDescriptionScreen,
    StylesScreen: StylesScreen,
    ArtistsScreen: ArtistsScreen,
    InterpreterScreen: InterpreterScreen,
    FolderScreen: FolderScreen,
    ConfirmationScreen: ConfirmationScreen,
    SaveDraftScreen: SaveDraftScreen
  }, {
    initialRouteName: 'RegisterSongScreen',
    headerMode: 'none'
  }
);
