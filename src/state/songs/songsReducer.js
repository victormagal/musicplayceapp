import {
  SONG_REGISTER_DATA,
  SONG_REGISTER_CLEAR,
  SONG_START_LOADING,
  SONG_FINISH_LOADING,
  SONG_CREATE_SUCCESS,
  SONG_CREATE_ERROR,
  FETCHED_ARTIST_SONGS,
  FETCHED_SONG,
  FETCHED_SONG_LYRICS
} from './songsAction';

const defaultSong = {
  name: '',
  lyrics: '',
  description: '',
  interpreter_name: '',
  coAuthors: null,
  folder: null,
  tags: null,
};

const songsReducer = (state, action) => {
  state = state || {
      songCreateSuccess: false,
      songCreateError: false,
      loading: false,
      song: {...defaultSong},
      mySongs: null
    };

  state.songCreateSuccess = false;
  state.songCreateError = false;

  switch (action.type) {
    case SONG_REGISTER_DATA:
      return {
        ...state,
        song: {...action.payload}
      };

    case SONG_REGISTER_CLEAR:
      return {
        ...state,
        song: {...defaultSong}
      };

    case SONG_START_LOADING:
      return {
        ...state,
       loading: true
      };

    case SONG_FINISH_LOADING:
      return {
        ...state,
        loading: false
      };

    case SONG_CREATE_SUCCESS:
      return {
        ...state,
        songCreateSuccess: true,
        loading: false
      };

    case SONG_CREATE_ERROR:
      return {
        ...state,
        songCreateError: true,
        loading: false
      };

    case FETCHED_ARTIST_SONGS:
      return {
        ...state,
        mySongs: action.payload,
        loading: false
      };

    case FETCHED_SONG:
      return {
        ...state,
        song: action.payload,
        loading: false
      };

    case FETCHED_SONG_LYRICS:
      return {
        ...state,
        songLyrics: action.payload,
        loading: false
      };


  }

  return state;
};

export default songsReducer;
