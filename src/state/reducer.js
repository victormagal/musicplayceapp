import { combineReducers } from 'redux';
import languageReducer from './language/languageReducer';
import profileReducer from './profile/profileReducer';

export const reducers = combineReducers({
    languageReducer,
    profileReducer
});
