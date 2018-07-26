import {
  SONG_REGISTER_DATA,
  SONG_REGISTER_CLEAR,
  SONG_START_LOADING,
  SONG_FINISH_LOADING,
  SONG_CREATE_SUCCESS,
  SONG_CREATE_ERROR,
  SONG_REMOVE_SUCCESS,
  SONG_REMOVE_ERROR,
  SONG_INDICATE_SUCCESS,
  SONG_INDICATE_ERROR,
  SONG_FAVORITE_SUCCESS,
  SONG_FAVORITE_ERROR,
  SONG_PUBLISH_SUCCESS,
  SONG_PUBLISH_ERROR,
  SONG_UNPUBLISH_SUCCESS,
  SONG_UNPUBLISH_ERROR,
  FETCHED_SONG_ARTIST_SONGS,
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
      loading: false,
      song: {...defaultSong},
      fetchedSong: null,
      mySongs: null
    };

  state.songCreateSuccess = false;
  state.songCreateError = false;
  state.songRemoveSuccess = false;
  state.songPublishSuccess = false;
  state.songUnpublishSuccess = false;
  state.songIndicateSuccess = false;


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
    
    case SONG_FAVORITE_ERROR:
    case SONG_INDICATE_ERROR:
    case SONG_PUBLISH_ERROR:
    case SONG_UNPUBLISH_ERROR:
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

    case SONG_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        songRemoveSuccess: true
      };

    case SONG_REMOVE_ERROR:
      return {
        ...state,
        loading: false
      };

    case SONG_PUBLISH_SUCCESS:
      return {
        ...state,
        loading: false,
        songPublishSuccess: true
      };
    
    case SONG_INDICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        songIndicateSuccess: true
      };

    case SONG_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        songFavoriteSuccess: true
      };

    case SONG_UNPUBLISH_SUCCESS:
      return {
        ...state,
        loading: false,
        songUnpublishSuccess: true
      };

    case FETCHED_SONG_ARTIST_SONGS:
      return {
        ...state,
        mySongs: action.payload,
        loading: false
      };

    case FETCHED_SONG:
      return {
        ...state,
        fetchedSong: action.payload,
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
