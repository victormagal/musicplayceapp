import {createAction} from 'redux-actions';
import {SongService} from '../../service';


export const SONG_START_LOADING = 'SONG_START_LOADING';
export const SONG_FINISH_LOADING = 'SONG_FINISH_LOADING';
export const SONG_REGISTER_CLEAR = 'SONG_REGISTER_CLEAR';
export const SONG_REGISTER_DATA = 'UPDATE_SONG_REGISTER_DATA';
export const SONG_CREATE_SUCCESS = 'SONG_CREATE_SUCCESS';
export const SONG_CREATE_ERROR = 'SONG_CREATE_ERROR';
export const FETCHED_ARTIST_SONGS = 'FETCHED_ARTIST_SONGS';
export const FETCHED_SONG = 'FETCHED_SONG';
export const FETCHED_SONG_LYRICS = 'FETCHED_SONG_LYRICS';


export const updateSongRegisterData = createAction(SONG_REGISTER_DATA, (data) => {
    return {...data};
});

export const songStartLoading = createAction(SONG_START_LOADING);
export const songFinishLoading = createAction(SONG_FINISH_LOADING);
export const songRegisterClear = createAction(SONG_REGISTER_CLEAR);
export const songCreateSuccess = createAction(SONG_CREATE_SUCCESS);
export const songCreateError = createAction(SONG_CREATE_ERROR);
export const fetchedArtistSongs = createAction(FETCHED_ARTIST_SONGS, data => data);
export const fetchedSong = createAction(FETCHED_SONG, data => data);
export const fetchedSongLyrics = createAction(FETCHED_SONG_LYRICS, data => data);

export const createSong = (song) => {
  return (dispatch, getState) => {
    let {profile} = getState().profileReducer;
    song.artist_id = profile.id;
    song.path = 'mock/path.mp3';

    dispatch(songStartLoading());
    return SongService.create(song).then(response => {
      dispatch(songCreateSuccess(response));
    }).catch(e => {
      dispatch(songCreateError(e.response));
    });
  };
};

export const getSong = (song) => {
  return (dispatch) => {
    dispatch(songStartLoading);

    return SongService.getSong(song).then(response => {
      dispatch(fetchedSong(response));
    }).catch(e => {
      dispatch(songFinishLoading(e.response));
    });
  };
};

export const getSongLyrics = (song) => {
  return (dispatch) => {
    dispatch(songStartLoading);

    return SongService.getSongLyrics(song).then(response => {
      dispatch(fetchedSongLyrics(response));
    }).catch(e => {
      dispatch(songFinishLoading(e.response));
    })
  }
}

export const fetchArtistSongs = (artist) => {
  return (dispatch) => {
    dispatch(songStartLoading());

    return SongService.artistSongs(artist).then(response => {
      dispatch(fetchedArtistSongs(response));
    }).catch(e => {
      dispatch(songFinishLoading(e.response));
    });
  };
};
