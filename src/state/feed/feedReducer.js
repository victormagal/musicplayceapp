import {
  FEED_START_LOADING,
  FEED_FINISH_LOADING,
  FETCHED_FEED_SEARCH
} from './feedAction';
import {
  USER_FOLLOW_SUCCESS, USER_STOP_FOLLOW_SUCCESS
} from '../user/userTypes'

const feedsReducer = (state, action) => {
  state = state || {
      loading: false,
      searching: false,
      searchingNotFound: false,
      feed: {}
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
        searching: false,
      };

    case FETCHED_FEED_SEARCH:
      return {
        ...state,
        loading: false,
        feed: action.payload,
        searching: false,
      };

    case USER_FOLLOW_SUCCESS:
      //TODO: update is following on feed list artist
      break;

    case USER_STOP_FOLLOW_SUCCESS:
      //TODO: update is following on feed list artist
      break;
  }

  return state;
};

export default feedsReducer;
