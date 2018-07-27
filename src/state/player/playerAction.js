import {createAction} from 'redux-actions';
import {PlayerService} from '../../service';


export const PLAYER_SONG_SAVE_RECEIVED = 'PLAYER_SONG_SAVE_RECEIVED';
export const PLAYER_SONG_SAVE = 'PLAYER_SONG_SAVE';
export const PLAYER_SONG_PLAY = 'PLAYER_SONG_PLAY';
export const PLAYER_SONG_PAUSE = 'PLAYER_SONG_PAUSE';
export const PLAYER_SONG_RESUME = 'PLAYER_SONG_RESUME';
export const PLAYER_SONG_STOP = 'PLAYER_SONG_STOP';
export const PLAYER_START_FETCH_ARTISTS_SONGS = 'PLAYER_START_FETCH_ARTISTS_SONGS';
export const PLAYER_FETCH_ARTISTS_SONGS_SUCCESS = 'PLAYER_FETCH_ARTISTS_SONGS_SUCCESS';
export const PLAYER_FETCH_ARTISTS_SONGS_ERROR = 'PLAYER_FETCH_ARTISTS_SONGS_ERROR';
export const PLAYER_SONG_UPDATE_PROGRESS = 'PLAYER_SONG_UPDATE_PROGRESS';


export const playerSongSave = createAction(PLAYER_SONG_SAVE, (folder) => {
  return {folder};
});

export const playerSongSaveReceived = createAction(PLAYER_SONG_SAVE_RECEIVED);
export const playerSongPlay = createAction(PLAYER_SONG_PLAY, (data) => data);
export const playerSongPause = createAction(PLAYER_SONG_PAUSE);
export const playerSongResume = createAction(PLAYER_SONG_RESUME);
export const playerSongStop = createAction(PLAYER_SONG_STOP)
export const playerStartFetchArtistsSongs = createAction(PLAYER_START_FETCH_ARTISTS_SONGS);
export const playerFetchArtistsSongsSuccess = createAction(PLAYER_FETCH_ARTISTS_SONGS_SUCCESS, data => data);
export const playerFetchArtistsSongsError = createAction(PLAYER_FETCH_ARTISTS_SONGS_ERROR);
export const playerSongUpdateProgress = createAction(PLAYER_SONG_UPDATE_PROGRESS, (progress) => progress);

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

export const songStop = () => {
  return (dispatch, getState) => {
    if(getState().playerReducer.player.song) {
      PlayerService.pause();
      dispatch(playerSongStop());
    }
  };
};

export const getArtistsSongs = (artists) => {
  return (dispatch) => {
    dispatch(playerStartFetchArtistsSongs());

    return Promise.all(artists.map(id => PlayerService.getArtistsSongs(id))).
              then(artistsArray => { dispatch(playerFetchArtistsSongsSuccess(artistsArray)) }).catch(e => {
      dispatch(playerFetchArtistsSongsError(e));
    });
  };
};



