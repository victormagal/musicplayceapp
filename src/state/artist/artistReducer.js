import {
  ARTIST_START_LOADING, ARTIST_FINISH_LOADING, FETCHED_ARTISTS,
  ARTIST_SAVE_SUCCESS, ARTIST_SAVE_ERROR
} from './artistAction';

const artistReducer = (state, action) => {
  state = state || {
    loading: false,
    artistSaveSuccess: false,
    artists: {
      data: [],
      pagination: null
    }
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

  }

  return state;
};

export default artistReducer;
