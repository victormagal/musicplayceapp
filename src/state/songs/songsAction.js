import {createAction} from 'redux-actions';

export const UPDATE_SONG_REGISTER_DATA = 'UPDATE_SONG_REGISTER_DATA';
export const updateSongRegisterData = createAction(UPDATE_SONG_REGISTER_DATA, (data) => {
    return {...data};
});
