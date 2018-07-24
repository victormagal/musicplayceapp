import {
  FAQ_FETCHED,
  FAQ_FETCH_ERROR,
  FAQ_LOADING_START,
  FAQ_LOADING_END,
  FAQ_SENT_SUCCESS,
  FAQ_SENT_ERROR
} from './helpAction';

const helpReducer = (state, action) => {
  state = state || {
    faqs: null,
    error: null,
    loading: false,
    sentSuccess: null
  };

  switch (action.type) {
    case FAQ_FETCHED:
      return {
        ...state,
        faqs: action.payload,
        error: null,
      };

    case FAQ_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        faqs: null
      };

    case FAQ_SENT_SUCCESS:
      return {
        ...state,
        sentSuccess: true,
      };

    case FAQ_SENT_ERROR:
      return {
        ...state,
        sentSuccess: false
      };

    case FAQ_LOADING_START:
      return {
        ...state,
        loading: true
      };

    case FAQ_LOADING_END:
      return {
        ...state,
        loading: false
      };
  }

  return state;
};

export default helpReducer;
