import {
  ARTIST_START_LOADING, ARTIST_FINISH_LOADING, FETCHED_ARTISTS,
  ARTIST_SAVE_SUCCESS, ARTIST_BY_ID_FETCHED, FETCHED_ARTIST_SONGS,
  ARTIST_FOLLOW_SUCCESS, ARTIST_FOLLOW_ERROR, ARTIST_SAVE_ERROR
} from './artistAction';

const artistReducer = (state, action) => {
  state = state || {
    loading: false,
    artistSaveSuccess: false,
    artist: null,
    artistsSongs: []
  };

  switch (action.type) {
    case ARTIST_START_LOADING:
      return {
        ...state,
        loading: true
      };

    case ARTIST_FINISH_LOADING:
      return {
        ...state,
        loading: false
      };

    case ARTIST_BY_ID_FETCHED:
      return {
        ...state,
        loading: false,
        artist: action.payload
      };

    case FETCHED_ARTISTS:
      return {
        ...state,
        loading: false,
        artists: action.payload
      };

    case ARTIST_SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        artistSaveSuccess: true
      };

    case ARTIST_FOLLOW_SUCCESS:
    case ARTIST_FOLLOW_ERROR:
    case ARTIST_SAVE_ERROR:
      return {
        ...state,
        loading: false
      };

    case FETCHED_ARTIST_SONGS:
      return {
        ...state,
        artistsSongs: action.payload
      };

  }

  return state;
};

export default artistReducer;
