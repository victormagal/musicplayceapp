import {
  LOAD_FONT,
  UPDATE_NETWORK,
  GENERAL_START_LOADING,
  GENERAL_FINISH_LOADING,
  FETCHED_CITY_BRAZIL,
  FETCHED_STATE_BRAZIL
} from './generalAction';

const generalReducer = (state, action) => {
  state = state || {
    fontLoaded: false,
    isConnected: false,
    loading: false,
    cities: null,
    states: null
  };

  switch (action.type) {
    case LOAD_FONT:
    case UPDATE_NETWORK:
      return {
        ...state,
        ...action.payload
      };

    case GENERAL_START_LOADING:
      return {
        ...state,
        loading: true
      };

    case GENERAL_FINISH_LOADING:
      return {
        ...state,
        loading: false
      };

    case FETCHED_CITY_BRAZIL:
      return {
        ...state,
        loading: false,
        cities: action.payload
      };

    case FETCHED_STATE_BRAZIL:
      return {
        ...state,
        states: action.payload
      };
  }

  return state;
};

export default generalReducer;
