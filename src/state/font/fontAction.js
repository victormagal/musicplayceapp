import {createAction} from 'redux-actions';

export const LOAD_FONT = 'LOAD_FONT';
export const loadFont = createAction(LOAD_FONT, (fontLoaded = false) => {
    return { fontLoaded: fontLoaded };
});