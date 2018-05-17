import enJson from '../../locale/en';
import {CHANGE_LANGUAGE} from './languageAction';

const languages = {
  en: enJson
};

const languageReducer = (state, action) => {
    state = state || {
            currentLanguage: 'en',
            messages: enJson
    };

    switch (action.type){

        case CHANGE_LANGUAGE:
            let language = action.payload.language;
            if(languages[language]){
                return {...state, currentLanguage: language, messages: languages[language]}
            }
            break;
    }

    return state;
};

export default languageReducer;
