import {createAction} from 'redux-actions';

export const LOAD_FONT = 'LOAD_FONT';
export const loadFont = createAction(LOAD_FONT, (fontLoaded = false) => {
    return { fontLoaded };
});

export const UPDATE_NETWORK = 'UPDATE_NETWORK';
export const updateNetwork = createAction(UPDATE_NETWORK, (isConnected = false) => {
  return { isConnected };
});
