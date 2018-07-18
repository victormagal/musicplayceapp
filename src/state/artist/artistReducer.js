import {
  ARTIST_START_LOADING, ARTIST_FINISH_LOADING, FETCHED_ARTISTS
} from './artistAction';

const artistReducer = (state, action) => {
  state = state || {
    loading: false,
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
  }

  return state;
};

export default artistReducer;
