import {
    FEED_START_LOADING,
    FEED_FINISH_LOADING,
    FETCHED_FEED_SEARCH
  } from './feedAction';
  
  const feedsReducer = (state, action) => {
    state = state || {
        loading: false,
        searching: false,
        searchingNotFound: false,
        feed: {
        }
      };
  
    switch (action.type) {
      case FEED_START_LOADING:
        return {
          ...state,
          loading: true,
          searching: true,
        };
  
      case FEED_FINISH_LOADING:
        return {
          ...state,
          loading: false,
        };
  
      case FETCHED_FEED_SEARCH:
        return {
          ...state,
          loading: false,
          feed: action.payload,
        }; 
    }
  
    return state;
  };
  
  export default feedsReducer;
  