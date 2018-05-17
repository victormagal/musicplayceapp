import {createAction} from 'redux-actions';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const changeLanguage = createAction(CHANGE_LANGUAGE, (language = 'en') => {
    return {language};
});