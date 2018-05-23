import { combineReducers } from 'redux';
import languageReducer from './language/languageReducer';
import profileReducer from './profile/profileReducer';
import fontReducer from './font/fontReducer';

export const reducers = combineReducers({
    languageReducer,
    profileReducer,
    fontReducer
});
