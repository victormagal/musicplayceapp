import {
  ARTIST_START_LOADING, ARTIST_FINISH_LOADING, FETCHED_ARTISTS,
  ARTIST_SAVE_SUCCESS, ARTIST_BY_ID_FETCHED, FETCHED_ARTIST_SONGS
} from './artistAction';

const artistReducer = (state, action) => {
  state = state || {
    loading: false,
    artistSaveSuccess: false,
    artists: {
      data: [],
      pagination: null
    },
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
        artists: action.payload
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

    case FETCHED_ARTIST_SONGS:
      return {
        ...state,
        artistsSongs: action.payload
      };

  }

  return state;
};

export default artistReducer;
