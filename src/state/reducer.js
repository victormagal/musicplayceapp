import {combineReducers} from 'redux';
import languageReducer from './language/languageReducer';
import profileReducer from './profile/profileReducer';
import generalReducer from './general/generalReducer';
import songsReducer from './songs/songsReducer';
import playerReducer from './player/playerReducer';
import authReducer from './auth/authReducer';

export const reducers = combineReducers({
  languageReducer,
  profileReducer,
  generalReducer,
  fontReducer: generalReducer,
  songsReducer,
  playerReducer,
  authReducer
});
