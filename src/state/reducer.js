import {combineReducers} from 'redux';
import languageReducer from './language/languageReducer';
import profileReducer from './profile/profileReducer';
import generalReducer from './general/generalReducer';
import songsReducer from './songs/songsReducer';
import playerReducer from './player/playerReducer';
import authReducer from './auth/authReducer';
import folderReducer from './folder/folderReducer';
import tagReducer from './tag/tagReducer';
import userReducer from './user/userReducer';
import helpReducer from './settings/help/helpReducer';
import feedbackReducer from './settings/feedback/feedbackReducer';
import termsReducer from './settings/termsAndConditions/termsReducer';
import feedsReducer from './feed/feedReducer';
import plansReducer from './plan/planReducer';
// import cardReducer from './card/cardReducer';
import {AUTH_LOGOUT} from './auth/authAction';

const rootReducer = combineReducers({
  languageReducer,
  profileReducer,
  generalReducer,
  fontReducer: generalReducer,
  songsReducer,
  playerReducer,
  authReducer,
  folderReducer,
  tagReducer,
  userReducer,
  helpReducer,
  feedbackReducer,
  termsReducer,
  feedsReducer,
  plansReducer
  // cardReducer
});


export const reducers = (state, action) => {
  if(action.type === AUTH_LOGOUT){
    state = undefined;
  }
  return rootReducer(state, action)
};
