import {
  TAG_START_LOADING, TAG_FINISH_LOADING, FETCHED_TAGS
} from './tagAction';


const tagReducer = (state, action) => {
  state = state || {
      loading: false,
      tags: null
    };

  switch (action.type) {

    case TAG_START_LOADING:
      return {
        ...state,
        loading: true
      };

    case TAG_FINISH_LOADING:
      return {
        ...state,
        loading: false
      };

    case FETCHED_TAGS:
      return {
        ...state,
        loading: false,
        tags: action.payload
      };
  }

  return state;
};

export default tagReducer;
