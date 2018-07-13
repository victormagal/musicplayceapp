import {combineReducers} from 'redux';
import languageReducer from './language/languageReducer';
import profileReducer from './profile/profileReducer';
import fontReducer from './font/fontReducer';
import songsReducer from './songs/songsReducer';
import playerReducer from './player/playerReducer';
import authReducer from './auth/authReducer';

export const reducers = combineReducers({
  languageReducer,
  profileReducer,
  fontReducer,
  songsReducer,
  playerReducer,
  authReducer
});
