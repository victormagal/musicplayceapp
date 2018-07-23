import {
  TERMS_AND_CONDITIONS_ACCEPTED,
  TERMS_AND_CONDITIONS_FETCH_ERROR,
  TERMS_AND_CONDITIONS_FETCHED,
  TERMS_AND_CONDITIONS_LOADING_END,
  TERMS_AND_CONDITIONS_LOADING_START
} from "./termsAction";

const termsReducer = (state, action) => {
  state = state || {
    termsAndConditions: null,
    error: null,
    loading: false,
    accepted: false
  };

  switch (action.type) {
    case TERMS_AND_CONDITIONS_FETCHED:
      return {
        ...state,
        termsAndConditions: action.payload,
        error: null,
      };

    case TERMS_AND_CONDITIONS_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        termsAndConditions: null
      };

    case TERMS_AND_CONDITIONS_ACCEPTED:
      return {
        ...state,
        accepted: true,
        error: null,
      };

    case TERMS_AND_CONDITIONS_LOADING_START:
      return {
        ...state,
        loading: true
      };

    case TERMS_AND_CONDITIONS_LOADING_END:
      return {
        ...state,
        loading: false
      };
  }

  return state;
};

export default termsReducer;
