import {createAction} from 'redux-actions';
import {PlayerService} from '../../service';


export const PLAYER_SONG_SAVE_RECEIVED = 'PLAYER_SONG_SAVE_RECEIVED';
export const PLAYER_SONG_SAVE = 'PLAYER_SONG_SAVE';
export const PLAYER_SONG_PLAY = 'PLAYER_SONG_PLAY';
export const PLAYER_SONG_PAUSE = 'PLAYER_SONG_PAUSE';
export const PLAYER_SONG_RESUME = 'PLAYER_SONG_RESUME';


export const playerSongSave = createAction(PLAYER_SONG_SAVE, (folder) => {
  return {folder};
});

export const playerSongSaveReceived = createAction(PLAYER_SONG_SAVE_RECEIVED);
export const playerSongPlay = createAction(PLAYER_SONG_PLAY);
export const playerSongPause = createAction(PLAYER_SONG_PAUSE);
export const playerSongResume = createAction(PLAYER_SONG_RESUME);


export const songPlay = (song) => {
  return (dispatch) => {
    PlayerService.play(song);
    dispatch(playerSongPlay(song));
  };
};

export const songPause = () => {
  return (dispatch) => {
    PlayerService.pause();
    dispatch(playerSongPause());
  };
};

export const songResume = () => {
  return (dispatch) => {
    PlayerService.resume();
    dispatch(playerSongResume());
  };
};


