import {
  FAQ_FETCHED,
  FAQ_FETCH_ERROR, FAQ_LOADING_START, FAQ_LOADING_END
} from './helpAction';

const helpReducer = (state, action) => {
  state = state || {
    faqs: null,
    error: null,
    faqLoading: false
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

    case FAQ_LOADING_START:
      return {
        ...state,
        faqLoading: true
      };

    case FAQ_LOADING_END:
      return {
        ...state,
        faqLoading: false
      };
  }

  return state;
};

export default helpReducer;
