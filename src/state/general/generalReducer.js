import {
  LOAD_FONT,
  UPDATE_NETWORK,
  SHOW_NETWORK_ERROR,
  HIDE_NETWORK_ERROR,
  GENERAL_START_LOADING,
  GENERAL_FINISH_LOADING,
  FETCHED_CITY_BRAZIL,
  FETCHED_STATE_BRAZIL
} from './generalAction';

const generalReducer = (state, action) => {
  state = state || {
    fontLoaded: false,
    isConnected: true,
    loading: false,
    cities: null,
    states: null,
    showError: false
  };

  switch (action.type) {
    case LOAD_FONT:
      return {
        ...state,
        fontLoaded: true
      };

    case UPDATE_NETWORK:
      if(state.isConnected === action.payload.isConnected){
        return state;
      }

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
        loading: false,
        states: action.payload
      };

    case SHOW_NETWORK_ERROR:
      return {
        ...state,
        showError: true
      };

    case HIDE_NETWORK_ERROR:
      return {
        ...state,
        showError: false
      };
  }

  return state;
};

export default generalReducer;
