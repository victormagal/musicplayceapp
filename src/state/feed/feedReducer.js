import {
    FEED_START_LOADING,
    FEED_FINISH_LOADING
  } from './feedAction';
  
  const feedsReducer = (state, action) => {
    state = state || {
        loading: false,
        feed: {
            data: [],
        }
      };
  
    switch (action.type) {
      case FEED_START_LOADING:
        return {
          ...state,
          loading: true,
        };
  
      case FEED_FINISH_LOADING:
        return {
          ...state,
          loading: false,
        };
  
      case SONG_START_LOADING:
        return {
          ...state,
          feed: action.payload,
         loading: true
        }; 
    }
  
    return state;
  };
  
  export default songsReducer;
  