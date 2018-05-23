import Expo from "expo";
import {LOAD_FONT} from './fontAction';

const fontReducer = (state, action) => {
    state = state || {
        fontLoaded: false,
    };

    switch (action.type){

        case LOAD_FONT:
            return { fontLoaded: action.payload.fontLoaded }
            break;
    }

    return state;
};

export default fontReducer;
