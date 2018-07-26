import {
  SONG_START_LOADING,
  SONG_FINISH_LOADING,
  SONG_DRAFT_SUCCESS,
  SONG_DRAFT_ERROR,
  SONG_REMOVE_SUCCESS,
  SONG_REMOVE_ERROR,
  SONG_PUBLISH_SUCCESS,
  SONG_PUBLISH_ERROR,
  SONG_UNPUBLISH_SUCCESS,
  SONG_UNPUBLISH_ERROR,
  FETCHED_ARTIST_SONGS,
  FETCHED_SONG,
  FETCHED_SONG_LYRICS,
  SONG_REGISTER_DATA,
  SONG_REGISTER_CLEAR
} from './songsType';

const defaultSong = {
  name: '',
  lyrics: '',
  description: '',
  interpreter_name: '',
  coAuthors: null,
  folder: null,
  tags: null,
  path: ''
};

const songsReducer = (state, action) => {
  state = state || {
    loading: false,
    fetchedSong: null,
    mySongs: null,
    song: {...defaultSong},
    songDraftSuccess: false,
    songRemoveSuccess: false,
    songPublishSuccess: false,
    songUnpublishSuccess: false,
    };

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

    case SONG_DRAFT_ERROR:
    case SONG_PUBLISH_ERROR:
    case SONG_UNPUBLISH_ERROR:
    case SONG_FINISH_LOADING:
      return {
        ...state,
        loading: false
      };

    case SONG_DRAFT_SUCCESS:
      return {
        ...state,
        songDraftSuccess: true,
        song: {...defaultSong}
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
        songPublishSuccess: true,
        song: {...defaultSong}
      };

    case SONG_UNPUBLISH_SUCCESS:
      return {
        ...state,
        loading: false,
        songUnpublishSuccess: true
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
