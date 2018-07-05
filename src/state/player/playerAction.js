import {createAction} from 'redux-actions';

export const PLAYER_SONG_SAVE = 'PLAYER_SONG_SAVE';
export const playerSongSave = createAction(PLAYER_SONG_SAVE, (folder) => {
    return {folder};
});

export const PLAYER_SONG_SAVE_RECEIVED = 'PLAYER_SONG_SAVE_RECEIVED';
export const playerSongSaveReceived = createAction(PLAYER_SONG_SAVE_RECEIVED);
